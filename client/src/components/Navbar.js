import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Optional: CSS for styling the navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          There4You 
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/feed" className="navbar-link">
              Feed
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/search" className="navbar-link">
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

