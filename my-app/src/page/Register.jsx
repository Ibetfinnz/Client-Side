import { useState } from 'react';
import './Register.css';
import Header_Login from '../components/Header_Login';
import { authApi } from '../services/api';

function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // ล้าง error เมื่อพิมพ์
  };

  const validate = () => {
    const newErrors = { firstName: '', lastName: '', email: '', password: '' };
    let isValid = true;

    // ตรวจ ชื่อจริง
    if (!form.firstName.trim()) {
      newErrors.firstName = 'กรุณากรอกชื่อจริง';
      isValid = false;
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = 'ชื่อจริงต้องมีอย่างน้อย 2 ตัวอักษร';
      isValid = false;
    }

    // ตรวจ นามสกุล
    if (!form.lastName.trim()) {
      newErrors.lastName = 'กรุณากรอกนามสกุล';
      isValid = false;
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร';
      isValid = false;
    }

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
    } else if (form.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
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
      await authApi.register({
        username: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });
      setMessage('✅ สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({ firstName: '', lastName: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.message || 'ไม่สามารถเชื่อมต่อ Server ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Login />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>ชื่อจริง</label>
            <input
              type="text"
              name="firstName"
              placeholder="Name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>นามสกุล</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </div>

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

          {message && (
            <p className={`form-message ${message.startsWith('✅') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'กำลังสมัคร...' : 'ลงทะเบียน'}
          </button>

        </form>
      </div>
    </>
  );
}

export default Register;