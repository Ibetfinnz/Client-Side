import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSession, getCurrentUser } from "../services/api";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { token, username } = getCurrentUser();
    if (token && username) {
      setUser({ username });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

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
            <Link to={"/group-list"}>ดูกลุ่มติวหนังสือ</Link>
            {user ? (
              <div className="navbar-user" ref={dropdownRef}>
                <button
                  className="navbar-avatar-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <div className="navbar-avatar">
                    {/* <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg> */}
                    <span>
                      {user.username[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="navbar-username">{user.username}</span>
                  <svg
                    className={`navbar-chevron ${dropdownOpen ? "open" : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="navbar-dropdown">
                    <div className="dropdown-header">
                      <span className="dropdown-name">{user.username}</span>
                    </div>
                    <div className="dropdown-line" />
                    <Link
                      to={"/my-groups"}
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      กลุ่มของฉัน
                    </Link>
                    <button
                      className="dropdown-item dropdown-item-logout"
                      onClick={handleLogout}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to={"/login"} className="btn-login">
                  เข้าสู่ระบบ
                </Link>
                <Link to={"/register"} className="btn-register">
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
