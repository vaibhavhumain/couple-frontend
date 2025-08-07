import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import WriteFeelingPage from './pages/WriteFeelingPage';
import UploadMemory from './pages/UploadMemory';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/write-feeling" element={<WriteFeelingPage />} />
        <Route path="/UploadMemory" element={<UploadMemory/>}/>
      </Routes>
    </Router>
  );
}
 
export default App;
