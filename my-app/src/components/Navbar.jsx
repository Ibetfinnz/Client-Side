import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <Link to={"/"}>
              IT <span>Study</span> Hub
            </Link>
          </div>
          <div className="navbar-links">
            <Link to={"/"}>หน้าแรก</Link>
            <Link to={"/study-group-list"}>ดูกลุ่มติวหนังสือ</Link>
            <div className="navbar-avatar">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
