import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action) => {
    setShowDropdown(false);
    if (action === 'settings') {
      onToggleSidebar();
    } else if (action === 'bank') {
      navigate('/connect-bank');
    } else if (action === 'logout') {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <button 
          className="hamburger-button"
          onClick={onToggleSidebar}
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
            {!isLoggedIn ? (
              <li><Link to="/login">Login</Link></li>
            ) : (
              <li className="settings-dropdown-container" ref={dropdownRef}>
                <button 
                  className="nav-settings-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-label="Settings"
                >
                  Settings ⚙️
                </button>
                {showDropdown && (
                  <div className="nav-dropdown">
                    <button 
                      onClick={() => handleMenuItemClick('settings')} 
                      className="dropdown-item"
                    >
                      Account Settings
                    </button>
                    <button 
                      onClick={() => handleMenuItemClick('bank')} 
                      className="dropdown-item"
                    >
                      Connect Bank Account
                    </button>
                    <button 
                      onClick={() => handleMenuItemClick('logout')} 
                      className="dropdown-item logout"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 