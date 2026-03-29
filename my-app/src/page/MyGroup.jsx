import "./MyGroup.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import { getCurrentUser, groupApi, isGroupOwner } from "../services/api";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function MyGroup() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = useMemo(() => getCurrentUser(), []);

    const fetchMyGroups = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await groupApi.getGroups();

            const myGroups = data.filter((group) => isGroupOwner(group, currentUser));

            setGroups(myGroups);
        } catch (err) {
            setError(err.message || "โหลดข้อมูลไม่สำเร็จ");
            setGroups([]);
        } finally {
            setLoading(false);
        }
    }, [currentUser.userId, currentUser.username]);

    useEffect(() => {
        if (!currentUser.token) {
            setError("กรุณาเข้าสู่ระบบเพื่อดูกลุ่มของคุณ");
            setLoading(false);
            return;
        }

        fetchMyGroups();
    }, [currentUser.token, fetchMyGroups]);

    return (
        <div className="my-groups-page">
            <Navbar />

            <main className="my-groups-main">
                <h2 className="my-groups-title">กลุ่มของฉัน</h2>

                {loading && <p>กำลังโหลดข้อมูล...</p>}
                {!loading && error && <p>{error}</p>}

                {!loading && !error && groups.length === 0 && (
                    <p>คุณยังไม่ได้สร้างกลุ่ม</p>
                )}

                {!loading && !error && groups.length > 0 && (
                    <div className="my-groups-grid">
                        {groups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={{ ...group, is_owner: true }}
                                onDeleted={fetchMyGroups}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}