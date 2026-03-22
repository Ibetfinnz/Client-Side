import { Link } from 'react-router-dom';
import './Header_Login.css';

function Header() {
  return (
    <header className="app-header1">
      <Link to="/" className="logo">IT Study Hub</Link> 
      <nav className="nav-links">
        <Link to="/login" className="item1">
          เข้าสู่ระบบ
        </Link>
        <Link to="/register" className="item1">
          สมัครสมาชิก
        </Link>
      </nav>
    </header>
  );
}

export default Header;