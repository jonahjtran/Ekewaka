import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [financialGoal, setFinancialGoal] = useState('');

  const handleGoalChange = (e) => {
    setFinancialGoal(e.target.value);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    console.log("Financial goal submitted:", financialGoal);
    // Additional processing such as API calls can be added here
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container header-container">
          <h1 className="logo">Ekewaka</h1>
          <nav className="navigation">
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <section className="hero">
        <div className="container hero-container">
          <h2>Plan Your Financial Future with Confidence</h2>
          <p>
            Ekewaka helps you set and achieve your long-term financial goals with personalized planning and easy-to-use tools.
          </p>
          {/* Financial Goal Input */}
          <form onSubmit={handleGoalSubmit} className="goal-form">
            <input 
              type="text" 
              placeholder="Enter your financial goal" 
              value={financialGoal} 
              onChange={handleGoalChange} 
              className="goal-input"
            />
            <button type="submit" className="cta-button">Submit Goal</button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
