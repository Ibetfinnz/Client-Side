import "./GroupList.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import FilterGroup from "../components/FilterGroup";
import GroupCard from "../components/GroupCard";

export default function GroupList() {
  return (
    <>
      <Navbar />
      <main>
        <FilterGroup />
        <div className="card-grid">
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
