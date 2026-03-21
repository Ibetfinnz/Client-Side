import "./GroupList.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import FilterGroup from "../components/FilterGroup";
import GroupCard from "../components/GroupCard";

import { useEffect, useState } from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/groups");
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroups();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <FilterGroup />
        {error && (
          <div className="state-box">
            <p>{error}</p>
          </div>
        )}
 
        {!error && groups.length === 0 && (
          <div className="state-box">
            <p>ยังไม่มีกลุ่มอ่านหนังสือในขณะนี้</p>
          </div>
        )}
 
        {!error && groups.length > 0 && (
          <div className="card-grid">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
