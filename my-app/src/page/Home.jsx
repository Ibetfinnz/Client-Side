import './Home.css';
 
function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <img
          src="https://s3.www.it.kmitl.co/wwwitkmitl/header%20-%20%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-2160x1080.jpg"
          alt="hero"
          className="hero-image"
        />
        <div className="hero-content">
          <h1 className="hero-title">IT Study Hub</h1>
          <p className="hero-subtitle">เว็บไซต์หาเพื่อนอ่านหนังสือภายในคณะ</p>
          <button className="hero-btn">ดูกลุ่มทั้งหมด →</button>
        </div>
      </section>
 
      {/* Section ด้านล่าง */}
      <section className="groups-section">
        <h2 className="section-title">กลุ่มที่กำลังจะเริ่มตัวเร็วๆ นี้</h2>
        <div className="group-cards">
          {/* Card ตัวอย่าง */}

        </div>
      </section>
    </div>
  );
}
 
export default Home;