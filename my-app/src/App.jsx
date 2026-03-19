import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';  
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import CreateGroup from './page/CreateGroup.jsx';
import Home from './page/Home.jsx';
import GroupList from './page/GroupList.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/CreateGroup" element={<CreateGroup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/GroupList" element={<GroupList />} />
      </Routes>
    </>
  );
}

export default App;