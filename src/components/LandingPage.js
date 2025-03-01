import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [financialGoal, setFinancialGoal] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const navigate = useNavigate();

  const handleGoalChange = (e) => {
    setFinancialGoal(e.target.value);
    adjustHeight(e.target);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    console.log("Financial goal submitted:", financialGoal);
    navigate('/chat-analysis', { state: { initialGoal: financialGoal } });
  };

  const adjustHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const toggleHowItWorks = () => {
    setShowHowItWorks(prev => !prev);
  };

  return (
    <div className="landing-page-content">
      <section className="hero">
        <div className="container hero-container">
          <h2>Plan Your Financial Future with Confidence</h2>
          <p>
            Ekewaka helps you set and achieve your long-term financial goals with personalized planning and easy-to-use tools.
          </p>
          <form onSubmit={handleGoalSubmit} className="goal-form">
            <div className="input-wrapper">
              <textarea 
                type="text" 
                placeholder="Enter your financial goal" 
                value={financialGoal} 
                onChange={handleGoalChange} 
                className="goal-input"
                rows="1"
              />
              <button 
                type="button" 
                className="help-button"
                onClick={toggleHowItWorks}
                aria-label="How it works"
              >
                ?
              </button>
            </div>
            <button type="submit" className="cta-button">Submit Goal</button>
          </form>
        </div>
      </section>

      {showHowItWorks && (
        <div className="modal-overlay" onClick={toggleHowItWorks}>
          <div className="how-it-works-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleHowItWorks}>&times;</button>
            <h2>How It Works</h2>
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
        </div>
      )}
    </div>
  );
}

export default LandingPage;



