import "./MyGroup.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyGroup() {
    const mockGroups = [
        { id: 1, ownerName: "Tibet Sawangkarn", title: "ชื่อเรื่องที่จะติว", subject: "วิชาที่ติว", description: "รายละเอียดในการติว abcdefghijklmnopqrstuvwxyz", isOwner: false },
        { id: 2, ownerName: "Thanasit Tungjai", title: "ชื่อเรื่องที่จะติว", subject: "วิชาที่ติว", description: "รายละเอียดในการติว abcdefghijklmnopqrstuvwxyz", isOwner: false },
        { id: 3, ownerName: "Nutthawat Chotpanjawong", title: "ชื่อเรื่องที่จะติว", subject: "วิชาที่ติว", description: "รายละเอียดในการติว abcdefghijklmnopqrstuvwxyz", isOwner: true },
    ];
    return (

        <div className="my-groups-page">
            <Navbar />

            <main className="my-groups-main">
                <h2 className="my-groups-title">กลุ่มของฉัน</h2>

                <div className="my-groups-grid">
                    <div className="my-groups-grid">
                        {groups.map((group) => (
                            <MyGroupCard
                                key={group.id}
                                group={group}
                                onDeleted={fetchMyGroups}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}