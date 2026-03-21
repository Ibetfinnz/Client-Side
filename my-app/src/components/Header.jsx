import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">IT Study Hub</Link> 
      <nav className="nav-links">
        <Link to="/login">เข้าสู่ระบบ</Link>
        <Link to="/register">สมัครสมาชิก</Link>
      </nav>
    </header>
  );
}

export default Header;