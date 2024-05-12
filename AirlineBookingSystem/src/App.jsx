import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PassengerDashboard from './components/PassengerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log("User Data:", userData);
    setUser(userData);
  };

  console.log("Current User:", user);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {!user ? (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to={user.role === 'admin' ? "/admin" : "/passenger"} />} />
              <Route path="/admin" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
              <Route path="/passenger" element={user.role === 'passenger' ? <PassengerDashboard /> : <Navigate to="/login" />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
