import "./GroupCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupApi } from "../services/api";

export default function GroupCard({ group, onJoined, onDeleted }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    id,
    image_url,
    title,
    subject,
    description,
    location,
    study_date,
    start_time,
    end_time,
    current_members,
    max_members,
    creator_name,
    is_owner,
    is_member,
  } = group;

  const firstLetter = creator_name ? creator_name.charAt(0).toUpperCase() : "?";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (t) => (t ? t.slice(0, 5) : "");

  const isFull = current_members >= max_members;

  const handleJoin = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await groupApi.joinGroup(id);
      if (onJoined) onJoined();
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("ยืนยันการลบกลุ่มนี้?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    try {
      await groupApi.deleteGroup(id);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err.message || "ไม่สามารถลบกลุ่มได้");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-author">
          <div className="author-avatar">{firstLetter}</div>
          <span className="author-name">{creator_name}</span>
        </div>
        <span>{current_members}/{max_members} คน</span>
      </div>

      <div className="card-img">
        {image_url ? <img src={image_url} alt={title} /> : <div />}
      </div>

      <div className="card-body">
        <p className="card-title">{title}</p>
        <p className="card-subject">วิชา: {subject}</p>
        <p className="card-datetime">
          <span className="card-date">วันที่: {formatDate(study_date)}</span>
          <span className="card-time">เวลา: {formatTime(start_time)} - {formatTime(end_time)}</span>
        </p>

        {error && <p className="card-error">{error}</p>}

        <div className="card-actions">
          {is_owner && (
            <button className="btn-delete" onClick={handleDelete}>
              ลบกลุ่มนี้
            </button>
          )}
          <button
            className="btn-outline"
            onClick={() => navigate(`/groups/${id}`)}
          >
            ดูรายละเอียด
          </button>
          {!is_owner && !is_member && (
            <button
              className="btn-join"
              disabled={isFull || loading}
              onClick={handleJoin}
            >
              {loading ? "กำลังเข้าร่วม..." : isFull ? "กลุ่มเต็มแล้ว" : "เข้าร่วมกลุ่ม"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}