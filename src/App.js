import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ChatAnalysisPage from './components/ChatAnalysisPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import BankConnectionPage from './components/BankConnectionPage';
import SettingsSidebar from './components/SettingsSidebar';
import Navbar from './components/Navbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBankConnected, setUserBankConnected] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
    // Check if bank is connected
    const bankConnected = localStorage.getItem('bank_connected');
    if (bankConnected) {
      setUserBankConnected(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('auth_token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('bank_connected');
    setIsLoggedIn(false);
    setUserBankConnected(false);
  };

  const handleBankConnection = (bankAccountId) => {
    // TODO: Implement actual bank connection logic
    console.log('Connecting bank account:', bankAccountId);
    localStorage.setItem('bank_connected', 'true');
    setUserBankConnected(true);
  };

  return (
    <GoogleOAuthProvider clientId="267940806546-plejk9pe4vrhnf4is65g3gvk8o62qdqn.apps.googleusercontent.com">
      <Router>
        <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <SettingsSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            userBankConnected={userBankConnected}
            isLoggedIn={isLoggedIn}
          />
          <Navbar 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat-analysis" element={<ChatAnalysisPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route 
                path="/login" 
                element={
                  <LoginPage 
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                  />
                } 
              />
              <Route 
                path="/connect-bank" 
                element={
                  <BankConnectionPage 
                    onBankConnection={handleBankConnection}
                  />
                } 
              />
            </Routes>
          </Layout>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;