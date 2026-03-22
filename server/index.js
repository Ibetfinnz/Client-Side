require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'it_study_hub',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS study_groups (
    id SERIAL PRIMARY KEY,
    image_url TEXT,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    study_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_members INT NOT NULL DEFAULT 10,
    description TEXT,
    created_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id INT REFERENCES study_groups(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(group_id, user_id)
  );
`)
.then(() => console.log('✅ All tables are ready'))
.catch(err => console.error('❌ Table creation error:', err.message));

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'PostgreSQL connected!', time: { now: result.rows[0].now } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: newUser.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Username หรือ Email นี้ถูกใช้ไปแล้ว' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'เข้าสู่ระบบสำเร็จ', token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบก่อน' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token ไม่ถูกต้องหรือหมดอายุ' });
    req.user = user;
    next();
  });
};

app.post('/api/groups', authenticateToken, async (req, res) => {
  const { image_url, title, subject, location, study_date, start_time, end_time, max_members, description } = req.body;
  if (!title || !subject || !location || !study_date || !start_time || !end_time || !max_members) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO study_groups 
        (image_url, title, subject, location, study_date, start_time, end_time, max_members, description, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [image_url, title, subject, location, study_date, start_time, end_time, max_members, description, req.user.id]
    );
    await pool.query(
      'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)',
      [result.rows[0].id, req.user.id]
    );
    res.status(201).json({ message: 'สร้างกลุ่มสำเร็จ', group: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

app.get('/api/groups', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        sg.*,
        u.username AS creator_name,
        COUNT(gm.user_id)::INT AS current_members
      FROM study_groups sg
      LEFT JOIN users u ON sg.created_by = u.id
      LEFT JOIN group_members gm ON sg.id = gm.group_id
      GROUP BY sg.id, u.username
      ORDER BY sg.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

app.get('/api/groups/:id', async (req, res) => {
  try {
    const groupResult = await pool.query(`
      SELECT 
        sg.*,
        u.username AS creator_name,
        COUNT(gm.user_id)::INT AS current_members
      FROM study_groups sg
      LEFT JOIN users u ON sg.created_by = u.id
      LEFT JOIN group_members gm ON sg.id = gm.group_id
      WHERE sg.id = $1
      GROUP BY sg.id, u.username
    `, [req.params.id]);

    if (groupResult.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบกลุ่มนี้' });
    }

    const membersResult = await pool.query(`
      SELECT u.id, u.username, gm.joined_at
      FROM group_members gm
      JOIN users u ON gm.user_id = u.id
      WHERE gm.group_id = $1
    `, [req.params.id]);

    res.json({ ...groupResult.rows[0], members: membersResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

app.post('/api/groups/:id/join', authenticateToken, async (req, res) => {
  const groupId = req.params.id;
  const userId = req.user.id;
  try {
    const group = await pool.query(`
      SELECT sg.max_members, COUNT(gm.user_id)::INT AS current_members
      FROM study_groups sg
      LEFT JOIN group_members gm ON sg.id = gm.group_id
      WHERE sg.id = $1
      GROUP BY sg.id
    `, [groupId]);

    if (group.rows.length === 0) return res.status(404).json({ error: 'ไม่พบกลุ่มนี้' });

    const { max_members, current_members } = group.rows[0];
    if (current_members >= max_members) {
      return res.status(400).json({ error: 'กลุ่มเต็มแล้ว' });
    }

    await pool.query(
      'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)',
      [groupId, userId]
    );
    res.json({ message: 'เข้าร่วมกลุ่มสำเร็จ' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'คุณเข้าร่วมกลุ่มนี้แล้ว' });
    }
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

app.delete('/api/groups/:id/leave', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM group_members WHERE group_id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'ออกจากกลุ่มสำเร็จ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});