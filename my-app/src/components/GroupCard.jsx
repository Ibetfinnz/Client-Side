import "./GroupCard.css";

import { useNavigate } from "react-router-dom";

export default function GroupCard({ group }) {
  const navigate = useNavigate();

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

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-author">
          <div className="author-avatar">{firstLetter}</div>
          <span className="author-name">{creator_name}</span>
        </div>
        <span>
          {current_members}/{max_members} คน
        </span>
      </div>

      <div className="card-img">
        {image_url ? <img src={image_url} alt={title} /> : <div></div>}
      </div>

      <div className="card-body">
        <p className="card-title">{title}</p>
        <p className="card-subject">วิชา: {subject}</p>
        {/* <p className="card-desc">รายละเอียด: {description}</p>
        <p className="card-location">สถานที่: {location}</p> */}
        <p className="card-datetime">
          <span className="card-date">วันที่: {formatDate(study_date)}</span>
          <span className="card-time">เวลา: {formatTime(start_time)} - {formatTime(end_time)}</span>
        </p>

        <div className="card-actions">
          <button
            className="btn-outline"
            onClick={() => navigate(`/groups/${id}`)}
          >
            ดูรายละเอียด
          </button>
          <button className="btn-join" disabled={isFull}>
            {isFull ? "กลุ่มเต็มแล้ว" : "เข้าร่วมกลุ่ม"}
          </button>
        </div>
      </div>
    </div>
  );
}
