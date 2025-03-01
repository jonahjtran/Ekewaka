import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're not on the home page, navigate to home and then scroll
      window.location.href = '/#' + sectionId;
    }
  };

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
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 