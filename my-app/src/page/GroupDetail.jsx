import "./GroupDetail.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCurrentUser, groupApi, isGroupOwner } from "../services/api";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GroupDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState("");

    const fetchGroupDetail = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await groupApi.getGroupDetail(id);
            setGroup(data);
        } catch (err) {
            setError(err.message || "โหลดข้อมูลกลุ่มไม่สำเร็จ");
            setGroup(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setError("ไม่พบรหัสกลุ่ม");
            setLoading(false);
            return;
        }

        fetchGroupDetail();
    }, [id]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : "-");

    const handleJoin = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setActionError("กรุณาเข้าสู่ระบบก่อน");
            return;
        }

        setActionLoading(true);
        setActionError("");
        try {
            await groupApi.joinGroup(id);
            await fetchGroupDetail();
        } catch (err) {
            setActionError(err.message || "เข้าร่วมกลุ่มไม่สำเร็จ");
        } finally {
            setActionLoading(false);
        }
    };

    const handleLeave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setActionError("กรุณาเข้าสู่ระบบก่อน");
            return;
        }

        setActionLoading(true);
        setActionError("");
        try {
            await groupApi.leaveGroup(id);
            await fetchGroupDetail();
        } catch (err) {
            setActionError(err.message || "ออกจากกลุ่มไม่สำเร็จ");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setActionError("กรุณาเข้าสู่ระบบก่อน");
            return;
        }

        if (!window.confirm("ยืนยันการลบกลุ่มนี้?")) return;

        setActionLoading(true);
        setActionError("");
        try {
            await groupApi.deleteGroup(id);
            navigate("/my-groups");
        } catch (err) {
            setActionError(err.message || "ลบกลุ่มไม่สำเร็จ");
        } finally {
            setActionLoading(false);
        }
    };

    const currentUser = getCurrentUser();

    const memberFromFallback =
        (currentUser.userId && (group?.members || []).some((m) => Number(m.id) === Number(currentUser.userId))) ||
        (currentUser.username && (group?.members || []).some((m) => m.username === currentUser.username));

    const isOwner = isGroupOwner(group, currentUser);
    const isMember = Boolean(group?.is_member || memberFromFallback || isOwner);

    return (
        <div className="group-detail-page">
            <Navbar />

            {/* Main */}
            <main className="group-detail-main">
                {loading && <p className="group-detail-status">กำลังโหลดข้อมูล...</p>}
                {!loading && error && <p className="group-detail-status group-detail-status-error">{error}</p>}

                {!loading && !error && group && (
                    <>
                {/* Left */}
                <section className="group-detail-left">
                    <div className="group-detail-image">
                        {group.image_url ? (
                            <img src={group.image_url} alt={group.title} className="group-detail-image-content" />
                        ) : (
                        <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
                            <path d="M75 30 L110 85 L40 85 Z" fill="#c4c4d4" />
                            <polygon
                                points="55,97 58,103 65,103 59,108 61,115 55,111 49,115 51,108 45,103 52,103"
                                fill="#c4c4d4"
                            />
                            <rect x="80" y="100" width="42" height="42" rx="10" fill="#c4c4d4" />
                        </svg>
                        )}
                    </div>

                    <div className="group-detail-topic">
                        <h2>{group.title}</h2>
                        <p className="group-detail-subject">วิชา: {group.subject}</p>
                        <p className="group-detail-description">
                            {group.description || "-"}
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
                            {group.location}
                        </div>
                        <div className="group-detail-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {formatDate(group.study_date)} {formatTime(group.start_time)} - {formatTime(group.end_time)}
                        </div>
                    </div>

                    <div className="group-detail-card">
                        <h3>สร้างโดย</h3>
                        <div className="group-detail-user">
                            <div className="group-detail-avatar" />
                            <span>{group.creator_name}</span>
                        </div>
                    </div>

                    <div className="group-detail-card">
                        <h3>สมาชิกในกลุ่ม ({group.current_members}/{group.max_members})</h3>
                        {(group.members || []).map((member) => (
                            <div key={member.id} className="group-detail-user">
                                <div className="group-detail-avatar group-detail-avatar-small" />
                                <span>{member.username}</span>
                            </div>
                        ))}
                    </div>

                    {!isMember && !isOwner && (
                        <button 
                            className={`group-detail-join-btn ${group.current_members >= group.max_members ? 'group-detail-full-btn' : ''}`}
                            onClick={handleJoin} 
                            disabled={actionLoading || group.current_members >= group.max_members}
                        >
                            {actionLoading ? "กำลังดำเนินการ..." : (group.current_members >= group.max_members ? "เต็มแล้ว" : "เข้าร่วมกลุ่มนี้")}
                        </button>
                    )}

                    {isMember && !isOwner && (
                        <button className="group-detail-leave-btn" onClick={handleLeave} disabled={actionLoading}>
                            {actionLoading ? "กำลังดำเนินการ..." : "ออกจากกลุ่มนี้"}
                        </button>
                    )}

                    {isOwner && (
                        <button className="group-detail-leave-btn" onClick={handleDelete} disabled={actionLoading}>
                            {actionLoading ? "กำลังดำเนินการ..." : "ลบกลุ่มนี้"}
                        </button>
                    )}

                    {actionError && <p className="group-detail-status group-detail-status-error">{actionError}</p>}
                </aside>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}