import './CreateGroupForm.css'

export default function CreateGroupForm() {
  return (
    <>
      <form action="" className="form-card">
        <div className="form-grid" id="createGroupForm">
          <div className="form-field">
            <label className="form-label">รูปภาพ (url)</label>
            <input
              className="form-input"
              type="url"
              placeholder="https://example.com/image.png"
            />
          </div>

          <div className="form-field">
            <label className="form-label">ชื่อหัวข้อ</label>
            <input
              className="form-input"
              type="text"
              placeholder="ระบุชื่อหัวข้อ"
            />
          </div>

          <div className="form-field">
            <label className="form-label">วิชา</label>
            <input className="form-input" type="text" placeholder="ระบุวิชา" />
          </div>

          <div className="form-field">
            <label className="form-label">สถานที่ในการอ่าน</label>
            <input className="form-input" type="text" placeholder="ระบุสถานที่" />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">วันที่</label>
              <input className="form-input" type="date" value="2026-03-18" />
            </div>
            <div className="form-field">
              <label className="form-label">เวลาเริ่มต้น</label>
              <input className="form-input" type="time" value="09:00" />
            </div>
            <div className="form-field">
              <label className="form-label">เวลาสิ้นสุด</label>
              <input className="form-input" type="time" value="16:00" />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">จำนวนคน</label>
            <input
              className="form-input"
              type="number"
              min="1"
              placeholder="ระบุจำนวนคน"
            />
          </div>

          <div className="form-field">
            <label className="form-label">รายละเอียดในการติว</label>
            <textarea
              className="form-textarea"
              placeholder="รายละเอียดเพิ่มเติม..."
            ></textarea>
          </div>

          <button className="btn-submit" onclick="handleSubmit()">
            ยืนยันการสร้างกลุ่ม
          </button>
        </div>
      </form>
    </>
  );
}
