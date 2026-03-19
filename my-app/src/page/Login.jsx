import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← เพิ่ม
import './Login.css';
import Header from '../components/Header';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ← เพิ่ม

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        navigate('/');
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage('❌ ไม่สามารถเชื่อมต่อ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          {message && <p className="form-message">{message}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;