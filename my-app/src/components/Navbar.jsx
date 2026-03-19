import './Navbar.css';

export default function () {
  return (
    <>
      <nav class="navbar">
        <div class="navbar-inner">
          <div class="navbar-logo">
            IT <span>Study</span> Hub
          </div>
          <div class="navbar-links">
            <a href="#">หน้าแรก</a>
            <a href="#">ดูกลุ่มติวหนังสือ</a>
            <div class="navbar-avatar">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
