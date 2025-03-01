import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <button 
          className="settings-button"
          onClick={() => window.dispatchEvent(new CustomEvent('toggleSidebar'))}
          aria-label="Open Settings"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <Link to="/" className="logo">Ekewaka</Link>
        
        <nav className="navigation">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 