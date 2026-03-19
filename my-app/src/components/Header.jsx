import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header className="app-header">
      <span className="logo">IT Study Hub</span>
      <nav className="nav-links">
        <Link to="/Login">เข้าสู่ระบบ</Link>
        <Link to="/Register">สมัครสมาชิก</Link>
      </nav>
    </header>
  );
}

export default Header;