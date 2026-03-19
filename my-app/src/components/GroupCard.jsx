import './GroupCard.css'

export default function GroupCard() {   
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-author">
          <div className="author-avatar">N</div>
          <span className="author-name">Nutthawat Chotpanjawong</span>
        </div>
        <button className="card-menu" aria-label="เมนู">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="card-img">
        
      </div>

      <div className="card-body">
        <p className="card-title">ชื่อเรื่องที่จะติว</p>
        <p className="card-subject">วิชาที่ติว</p>
        <p className="card-desc">
          รายละเอียดในการติว abcdefghijklmnopqrstuvwxyz
        </p>
        <div className="card-actions">
          <button className="btn-outline">ดูรายละเอียด</button>
          <button className="btn-join">เข้าร่วมกลุ่ม</button>
        </div>
      </div>
    </div>
  );
}
