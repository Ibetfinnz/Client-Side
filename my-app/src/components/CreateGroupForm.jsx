import "./CreateGroupForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGroupForm() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    subject: "",
    location: "",
    study_date: today,
    start_time: "",
    end_time: "",
    max_members: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { title, subject, location, study_date, start_time, end_time, max_members } = formData;

    if (!title || !subject || !location || !study_date || !start_time || !end_time || !max_members) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (start_time >= end_time) {
      setError("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อนสร้างกลุ่ม");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          max_members: parseInt(formData.max_members, 10),
          image_url: formData.image_url || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      } else {
        setSuccess("สร้างกลุ่มสำเร็จเรียบร้อยแล้ว 🎉");
        setTimeout(() => navigate("/group-list"), 1000);
        setFormData({
          image_url: "",
          title: "",
          subject: "",
          location: "",
          study_date: today,
          start_time: "",
          end_time: "",
          max_members: "",
          description: "",
        });
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="POST" className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid" id="createGroupForm">
        {error && <div className="form-alert form-alert--error">{error}</div>}
        {success && <div className="form-alert form-alert--success">{success}</div>}

        <div className="form-field">
          <label className="form-label">รูปภาพ (url)</label>
          <input
            className="form-input"
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
          />
        </div>

        <div className="form-field">
          <label className="form-label">ชื่อหัวข้อ</label>
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="ระบุชื่อหัวข้อ"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">วิชา</label>
          <input
            className="form-input"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="ระบุวิชา"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">สถานที่ในการอ่าน</label>
          <input
            className="form-input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="ระบุสถานที่"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">วันที่</label>
            <input
              className="form-input"
              type="date"
              name="study_date"
              value={formData.study_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">เวลาเริ่มต้น</label>
            <input
              className="form-input"
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">เวลาสิ้นสุด</label>
            <input
              className="form-input"
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">จำนวนคน</label>
          <input
            className="form-input"
            type="number"
            name="max_members"
            value={formData.max_members}
            onChange={handleChange}
            min="1"
            placeholder="ระบุจำนวนคน"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">รายละเอียดในการติว</label>
          <textarea
            className="form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดเพิ่มเติม..."
          />
        </div>

        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "กำลังบันทึก..." : "ยืนยันการสร้างกลุ่ม"}
        </button>
      </div>
    </form>
  );
}