import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ChatAnalysisPage from './components/ChatAnalysisPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import SettingsSidebar from './components/SettingsSidebar';
import Navbar from './components/Navbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    const handleToggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
    };

    window.addEventListener('toggleSidebar', handleToggleSidebar);
    return () => window.removeEventListener('toggleSidebar', handleToggleSidebar);
  }, []);

  return (
    <GoogleOAuthProvider clientId="267940806546-l6gari008bu1257k4ok086pqa2fq9ljj.apps.googleusercontent.com">
      <Router>
        <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <SettingsSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            userBankConnected={false}
            isLoggedIn={false}
          />
          <Navbar />
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat-analysis" element={<ChatAnalysisPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;