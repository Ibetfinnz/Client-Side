import "./GroupDetail.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GroupDetail() {
    return (
        <div className="group-detail-page">
            <Navbar />

            {/* Main */}
            <main className="group-detail-main">
                {/* Left */}
                <section className="group-detail-left">
                    <div className="group-detail-image">
                        <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
                            <path d="M75 30 L110 85 L40 85 Z" fill="#c4c4d4" />
                            <polygon
                                points="55,97 58,103 65,103 59,108 61,115 55,111 49,115 51,108 45,103 52,103"
                                fill="#c4c4d4"
                            />
                            <rect x="80" y="100" width="42" height="42" rx="10" fill="#c4c4d4" />
                        </svg>
                    </div>

                    <div className="group-detail-topic">
                        <h2>ชื่อหัวข้อ</h2>
                        <p className="group-detail-subject">วิชา</p>
                        <p className="group-detail-description">
                            รายละเอียดในการติว abcdefghijklmnopqrstuvwxyz
                        </p>
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="group-detail-right">
                    <div className="group-detail-card">
                        <h3>สถานที่และเวลา</h3>
                        <div className="group-detail-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Name
                        </div>
                        <div className="group-detail-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Name
                        </div>
                    </div>

                    <div className="group-detail-card">
                        <h3>สร้างโดย</h3>
                        <div className="group-detail-user">
                            <div className="group-detail-avatar" />
                            <span>Name</span>
                        </div>
                    </div>

                    <div className="group-detail-card">
                        <h3>สมาชิกในกลุ่ม (5/12)</h3>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group-detail-user">
                                <div className="group-detail-avatar group-detail-avatar-small" />
                                <span>Name</span>
                            </div>
                        ))}
                    </div>

                    <button className="group-detail-join-btn">เข้าร่วมกลุ่มนี้</button>
                </aside>
            </main>

            <Footer />
        </div>
    );
}