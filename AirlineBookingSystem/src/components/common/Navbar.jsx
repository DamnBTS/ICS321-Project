import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!user && <li><Link to="/login">Login</Link></li>}
        {user && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
