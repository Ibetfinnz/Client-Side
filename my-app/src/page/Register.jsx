import { useState } from 'react';
import './Register.css';

function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        setForm({ firstName: '', lastName: '', email: '', password: '' });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage('❌ ไม่สามารถเชื่อมต่อ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อจริง</label>
          <input
            type="text"
            name="firstName"
            placeholder="Value"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>นามสกุล</label>
          <input
            type="text"
            name="lastName"
            placeholder="Value"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>อีเมล</label>
          <input
            type="email"
            name="email"
            placeholder="Value"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            placeholder="Value"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {message && <p className="form-message">{message}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'กำลังสมัคร...' : 'ลงทะเบียน'}
        </button>
      </form>
    </div>
  );
}

export default Register;