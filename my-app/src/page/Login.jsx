import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import Header_Login from '../components/Header_Login';
import { authApi } from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await authApi.login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/');
    } catch (err) {
      setMessage(`❌ ${err.message || 'ไม่สามารถเชื่อมต่อ Server ได้'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Login />
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