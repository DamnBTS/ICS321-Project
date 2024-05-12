import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PassengerDashboard from './components/PassengerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HandleLogin from './components/HandleLogin';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log("User Data on Login:", userData);
    setUser(userData);
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <HandleLogin user={user} />
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/passenger" element={<PassengerDashboard />} />
              <Route path="*" element={<Navigate to={user.role === 'admin' ? "/admin" : "/passenger"} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
