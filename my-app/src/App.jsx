import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';  
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import CreateGroup from './page/CreateGroup.jsx';
import Home from './page/Home.jsx';
import GroupList from './page/GroupList.jsx';
import GroupDetail from './page/GroupDetail.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/group-list" element={<GroupList />} />
        <Route path="/group-detail" element={<GroupDetail />} />
      </Routes>
    </>
  );
}

export default App;