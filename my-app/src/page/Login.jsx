import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header_Login from '../components/Header_Login';
import { authApi } from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // ตรวจ email
    if (!form.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
      isValid = false;
    }

    // ตรวจ password
    if (!form.password.trim()) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return; // หยุดถ้า validate ไม่ผ่าน

    setLoading(true);
    try {
      const data = await authApi.login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/');
    } catch (err) {
      setMessage(err.message || 'ไม่สามารถเชื่อมต่อ Server ได้');
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
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {message && <p className="form-message error">{message}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

        </form>
      </div>
    </>
  );
}

export default Login;