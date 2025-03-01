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

      <section className="features" id="features">
        <div className="container">
          <h3>Our Features</h3>
          <div className="feature-list">
            <div className="feature">
              <h4>Custom Plans</h4>
              <p>Create personalized financial plans tailored to your unique needs.</p>
            </div>
            <div className="feature">
              <h4>Progress Tracking</h4>
              <p>Monitor your journey with intuitive dashboards and real-time updates.</p>
            </div>
            <div className="feature">
              <h4>Expert Guidance</h4>
              <p>Access financial advice and insights from industry experts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h3>How It Works</h3>
          <ol>
            <li><strong>Sign Up:</strong> Create your free account.</li>
            <li><strong>Set Goals:</strong> Define your long-term financial objectives.</li>
            <li><strong>Plan & Track:</strong> Receive custom plans and track your progress.</li>
          </ol>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ekewaka. All rights reserved.</p>
          <p>
            Contact us at <a href="mailto:support@ekewaka.com">support@ekewaka.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
