import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ChatAnalysisPage from './components/ChatAnalysisPage';
import AboutPage from './components/AboutPage';
import SettingsSidebar from './components/SettingsSidebar';
import Navbar from './components/Navbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
    };

    window.addEventListener('toggleSidebar', handleToggleSidebar);
    return () => window.removeEventListener('toggleSidebar', handleToggleSidebar);
  }, []);

  return (
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
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;