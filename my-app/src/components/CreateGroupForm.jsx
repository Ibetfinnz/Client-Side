import './CreateGroupForm.css'

export default function CreateGroupForm() {
  return (
    <>
      <div class="card">
        <div class="form-grid" id="createGroupForm">
          <div class="form-field">
            <label class="form-label">รูปภาพ (url)</label>
            <input
              class="form-input"
              type="url"
              placeholder="https://example.com/image.png"
            />
          </div>

          <div class="form-field">
            <label class="form-label">ชื่อหัวข้อ</label>
            <input
              class="form-input"
              type="text"
              placeholder="ระบุชื่อหัวข้อ"
            />
          </div>

          <div class="form-field">
            <label class="form-label">วิชา</label>
            <input class="form-input" type="text" placeholder="ระบุวิชา" />
          </div>

          <div class="form-field">
            <label class="form-label">สถานที่ในการอ่าน</label>
            <input class="form-input" type="text" placeholder="ระบุสถานที่" />
          </div>

          <div class="form-row">
            <div class="form-field">
              <label class="form-label">วันที่</label>
              <input class="form-input" type="date" value="2026-03-18" />
            </div>
            <div class="form-field">
              <label class="form-label">เวลาเริ่มต้น</label>
              <input class="form-input" type="time" value="09:00" />
            </div>
            <div class="form-field">
              <label class="form-label">เวลาสิ้นสุด</label>
              <input class="form-input" type="time" value="16:00" />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">จำนวนคน</label>
            <input
              class="form-input"
              type="number"
              min="1"
              placeholder="ระบุจำนวนคน"
            />
          </div>

          <div class="form-field">
            <label class="form-label">รายละเอียดในการติว</label>
            <textarea
              class="form-textarea"
              placeholder="รายละเอียดเพิ่มเติม..."
            ></textarea>
          </div>

          <button class="btn-submit" onclick="handleSubmit()">
            ยืนยันการสร้างกลุ่ม
          </button>
        </div>
      </div>
    </>
  );
}
