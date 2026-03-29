import './Home.css';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GroupCard from "../components/GroupCard";
import { useEffect, useState } from "react";
import { groupApi } from "../services/api";

function Home() {
  const [upcomingGroups, setUpcomingGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupApi.getGroups();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data
          .sort((a, b) => new Date(a.study_date) - new Date(b.study_date))
          .slice(0, 3);

        setUpcomingGroups(upcoming);
      } catch (err) {
        console.error(err.message || err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="home-wrapper">
      <Header />
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
          <Link to={"/group-list"} className="hero-btn">ดูกลุ่มทั้งหมด →</Link>
        </div>
      </section>

      {/* Section ด้านล่าง */}
      <section className="groups-section">
        <h2 className="section-title">กลุ่มที่กำลังจะเริ่มติวเร็วๆ นี้</h2>
        <div className="group-cards">
          {upcomingGroups.length > 0 ? (
            upcomingGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <p className="no-groups">ยังไม่มีกลุ่มที่กำลังจะเริ่มในเร็วๆ นี้</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;