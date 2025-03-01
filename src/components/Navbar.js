import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SettingsSidebar from './SettingsSidebar';

const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <button 
            className="settings-button"
            onClick={() => setIsSettingsOpen(true)}
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

      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userBankConnected={false} // Replace with actual bank connection status
        isLoggedIn={false} // Replace with actual login status
      />
    </>
  );
};

export default Navbar; 