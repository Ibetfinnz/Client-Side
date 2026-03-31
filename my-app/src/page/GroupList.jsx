import "./GroupList.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterGroup from "../components/FilterGroup";
import GroupCard from "../components/GroupCard";
import { groupApi } from "../services/api";

import { useEffect, useState } from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(null);

  const fetchGroups = async () => {
    try {
      const data = await groupApi.getGroups();
      setGroups(data);
    } catch (err) {
      setError(err.message || "โหลดข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const subjectOptions = [
    ...new Set(groups.map((g) => g.subject).filter(Boolean)),
  ].sort();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredGroups = groups.filter((g) => {
        if (g.study_date) {
          const studyDate = new Date(g.study_date);
          console.log(studyDate)
          studyDate.setHours(0, 0, 0, 0);
          if (studyDate < today) {
            return false;
          }
        }
        if (!filters) return true;
        if (!filters.allDays && filters.date && filters.dateSelected) {
          if (!g.study_date) return false;
          const d = new Date(g.study_date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const localGroupDate = `${year}-${month}-${day}`;

          if (localGroupDate !== filters.date) return false;
        }

        if (!filters.allTimes && filters.startTime && filters.endTime) {
          if (
            g.start_time >= filters.endTime ||
            g.end_time <= filters.startTime
          )
            return false;
        }

        if (filters.subjects.length > 0) {
          if (!filters.subjects.includes(g.subject)) return false;
        }

        return true;
      });

  return (
    <>
      <Navbar />
      <main>
        <FilterGroup subjectOptions={subjectOptions} onFilter={setFilters} />
        {error && (
          <div className="state-box">
            <p>{error}</p>
          </div>
        )}

        {!error && filteredGroups.length === 0 && (
          <div className="state-box">
            <p>
              {filters
                ? "ไม่พบกลุ่มที่ตรงกับเงื่อนไข"
                : "ยังไม่มีกลุ่มอ่านหนังสือในขณะนี้"}
            </p>
          </div>
        )}

        {!error && filteredGroups.length > 0 && (
          <div className="card-grid">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
