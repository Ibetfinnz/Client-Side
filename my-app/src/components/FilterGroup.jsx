import "./FilterGroup.css";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const todayStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function FilterGroup({ subjectOptions = [], onFilter }) {
  const [date, setDate] = useState(todayStr());
  const [dateSelected, setDateSelected] = useState(false);
  const [allDays, setAllDays] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allTimes, setAllTimes] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const selectRef = useRef(null);

  const handleAllDaysChange = (checked) => {
    setAllDays(checked);
    if (checked) setDate("");
  };

  const handleAllTimesChange = (checked) => {
    setAllTimes(checked);
    if (checked) {
      setStartTime("");
      setEndTime("");
    }
  };

  const handleSearch = () => {
    onFilter?.({
      allDays,
      date: allDays ? "" : date,
      dateSelected: !allDays && dateSelected,
      allTimes,
      startTime: allTimes ? "" : startTime,
      endTime: allTimes ? "" : endTime,
      subjects,
    });
  };

  const handleReset = () => {
    setDate(todayStr());
    setDateSelected(false);
    setAllDays(false);
    setStartTime("");
    setEndTime("");
    setAllTimes(false);
    setSubjects([]);
    if (selectRef.current) selectRef.current.value = "";
    onFilter?.(null);
  };

  const addSubject = (value) => {
    if (!value || subjects.includes(value)) return;
    setSubjects([...subjects, value]);
    if (selectRef.current) selectRef.current.value = "";
  };

  const removeSubject = (s) => {
    setSubjects(subjects.filter((x) => x !== s));
  };

  return (
    <>
      <div className="filter-bar" id="filterBar">
        <div className="filter-row">
          <div className="filter-left">
            <div className="filter-field">
              <label htmlFor="filterDate" className="filter-label">
                วันที่
              </label>
              <input
                className="filter-input"
                type="date"
                id="filterDate"
                min={todayStr()}
                value={date}
                disabled={allDays}
                onChange={(e) => { setDate(e.target.value); setDateSelected(true); }}
              />
            </div>

            <label className="checkbox-wrap">
              <input
                type="checkbox"
                id="allDays"
                checked={allDays}
                onChange={(e) => handleAllDaysChange(e.target.checked)}
              />
              เลือกทุกวัน
            </label>

            <div className="filter-field">
              <label htmlFor="filterStart" className="filter-label">
                เวลาเริ่มต้น
              </label>
              <input
                className="filter-input"
                type="time"
                id="filterStart"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="filterEnd" className="filter-label">
                เวลาสิ้นสุด
              </label>
              <input
                className="filter-input"
                type="time"
                id="filterEnd"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <label className="checkbox-wrap">
              <input
                type="checkbox"
                id="allTimes"
                checked={allTimes}
                onChange={(e) => handleAllTimesChange(e.target.checked)}
              />
              เลือกทุกเวลา
            </label>

            <div className="filter-field">
              <label htmlFor="filterSubject" className="filter-label">
                วิชา
              </label>
              <select
                ref={selectRef}
                className="filter-select"
                id="filterSubject"
                defaultValue=""
                onChange={(e) => addSubject(e.target.value)}
              >
                <option value="" disabled>
                  เลือกวิชา
                </option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s} disabled={subjects.includes(s)}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-blue" onClick={handleSearch}>
              ค้นหา
            </button>

            <button className="btn btn-reset" onClick={handleReset}>
              รีเซ็ต
            </button>
          </div>

          <div className="filter-right">
            <Link to={"/create-group"}>
              <button className="btn btn-green">สร้างกลุ่มอ่านหนังสือ</button>
            </Link>
          </div>
        </div>

        {subjects.length > 0 && (
          <div className="filter-tags">
            {subjects.map((s) => (
              <span key={s} className="tag">
                {s}
                <button className="tag-remove" onClick={() => removeSubject(s)}>
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
