import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Navbar from './Navbar';

function LandingPage() {
  const [financialGoal, setFinancialGoal] = useState('');
  const navigate = useNavigate();

  const handleGoalChange = (e) => {
    setFinancialGoal(e.target.value);
    adjustHeight(e.target);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    console.log("Financial goal submitted:", financialGoal);
    // Navigate to the chat analysis page
    navigate('/chat-analysis', { state: { initialGoal: financialGoal } });
  };

  const adjustHeight = (element) => {
    element.style.height = 'auto'; // Reset height
    element.style.height = `${element.scrollHeight}px`; // Set height to scroll height
  };

  return (
    <div className="landing-page">
      <Navbar />
      
      <section className="hero">
        <div className="container hero-container">
          <h2>Plan Your Financial Future with Confidence</h2>
          <p>
            Ekewaka helps you set and achieve your long-term financial goals with personalized planning and easy-to-use tools.
          </p>
          {/* Financial Goal Input */}
          <form onSubmit={handleGoalSubmit} className="goal-form">
            <textarea 
              type="text" 
              placeholder="Enter your financial goal and time frame" 
              value={financialGoal} 
              onChange={handleGoalChange} 
              className="goal-input"
              rows="1" // Start with one row
            />
            <button type="submit" className="cta-button">Submit Goal</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;



