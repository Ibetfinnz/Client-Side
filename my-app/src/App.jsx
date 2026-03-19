import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import CreateGroup from './page/CreateGroup.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Creategroup" element={<CreateGroup />} />
      </Routes>
    </>
  );
}

export default App;