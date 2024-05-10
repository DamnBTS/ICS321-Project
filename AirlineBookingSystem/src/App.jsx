// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import PassengerDashboard from './components/PassengerDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';

// function App() {
//   const [user, setUser] = useState(null);

//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Switch>
//           <Route path="/login">
//             {!user ? <Login onLogin={handleLogin} /> : <Redirect to={user.role === 'admin' ? "/admin" : "/passenger"} />}
//           </Route>
//           <Route path="/admin">
//             {user && user.role === 'admin' ? <AdminDashboard /> : <Redirect to="/login" />}
//           </Route>
//           <Route path="/passenger">
//             {user && user.role === 'passenger' ? <PassengerDashboard /> : <Redirect to="/login" />}
//           </Route>
//           <Redirect from="/" to="/login" />
//         </Switch>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

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
    setUser(userData);
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === 'admin' ? "/admin" : "/passenger"} />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/passenger" element={user && user.role === 'passenger' ? <PassengerDashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

