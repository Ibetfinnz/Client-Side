import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './page/Header.jsx';  // ✅ แก้ตรงนี้
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;