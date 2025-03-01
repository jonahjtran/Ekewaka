import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [financialGoal, setFinancialGoal] = useState('');
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(true);
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

  const toggleHowItWorks = () => {
    setIsHowItWorksExpanded(prev => !prev);
  };

  return (
    <div className="landing-page">
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

      <section className={`how-it-works ${isHowItWorksExpanded ? 'expanded' : 'minimized'}`}>
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <button 
              className="toggle-button" 
              onClick={toggleHowItWorks}
              aria-label={isHowItWorksExpanded ? "Minimize section" : "Expand section"}
            >
              {isHowItWorksExpanded ? '−' : '+'}
            </button>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Share Your Goal</h3>
              <p>Tell us about your financial goals, whether it's saving for a home, planning for retirement, or building an emergency fund.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our AI assistant analyzes your goals and current financial situation through natural conversation.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Get Your Plan</h3>
              <p>Receive a personalized financial plan with actionable steps and visual budget comparisons.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Track Progress</h3>
              <p>Monitor your progress and get ongoing guidance as you work toward your financial objectives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;



