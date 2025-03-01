import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from './context/context';
import './LandingPage.css';

function LandingPage() {
  const [financialGoal, setFinancialGoal] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const { onSent } = useContext(context);

  const handleGoalChange = (e) => {
    setFinancialGoal(e.target.value);
    setInputError(false);
    adjustHeight(e.target);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (!financialGoal.trim()) {
      setInputError(true);
      return;
    }
    
    const merchant_id_mapping = {
      "67c2b24d9683f20dd518c08d":"Amazon",
      "67c2b2619683f20dd518c08e":"Walmart",
      "67c2b2749683f20dd518c08f":"Target",
      "67c2b2869683f20dd518c090":"Costco",
      "67c2b2949683f20dd518c091":"Best Buy",
      "67c2b2a69683f20dd518c092":"Home Depot",
      "67c2b2b49683f20dd518c093":"Lowe's",
      "67c2b2c09683f20dd518c094":"Starbucks",
      "67c2b2ce9683f20dd518c095":"McDonald's",
      "67c2b2da9683f20dd518c096":"Chipotle",
      "67c2b2e79683f20dd518c097":"Netflix",
      "67c2b2f49683f20dd518c098":"Spotify",
      "67c2b3019683f20dd518c099":"Uber",
      "67c2b30f9683f20dd518c09a":"Lyft",
      "67c2b31f9683f20dd518c09f":"Airbnb",
      "67c2b32a9683f20dd518c0a0":"Expedia",
      "67c2b3399683f20dd518c0a1":"Apple",
      "67c2b3499683f20dd518c0a2":"Google Play",
      "67c2b3579683f20dd518c0a3":"Nike",
      "67c2b3689683f20dd518c0a4":"Adidas",
      "67c2b37c9683f20dd518c0a5":"Sephora",
      "67c2b3889683f20dd518c0a6":"CVS",
      "67c2b3959683f20dd518c0a7":"Walgreens",
      "67c2b3a09683f20dd518c0a8":"Shell",
      "67c2b3a99683f20dd518c0a9":"BP"
    }
    console.log("Financial goal submitted:", financialGoal);
    const apiKey = process.env.REACT_APP_NESSIE_API_KEY;
    const user_id = "67c28f299683f20dd518c026";
    const purchase_url = `http://api.nessieisreal.com/accounts/${user_id}/purchases?key=${apiKey}`;
    const purchase_response = await fetch(purchase_url);
    const purchases = await purchase_response.json();
    const deposit_url = `http://api.nessieisreal.com/accounts/${user_id}/deposits?key=${apiKey}`;
    const deposit_response = await fetch(deposit_url);
    const deposits = await deposit_response.json();
    const bill_url = `http://api.nessieisreal.com/accounts/${user_id}/bills?key=${apiKey}`;
    const bill_response = await fetch(bill_url);
    const bills = await bill_response.json();
    const extractedPurchases = purchases.map(item => ({
      merchant_id: merchant_id_mapping[item.merchant_id],
      purchase_date: item.purchase_date,
      amount: item.amount
    }));
    const extractedDeposits = deposits.map(item => ({
      transaction_date: item.transaction_date,
      amount: item.amount,
    }));
    const extractedBills = bills.map(item => ({
      payee: item.payee,
      payment_date: item.payment_date,
      payment_amount: item.payment_amount
    }));
    localStorage.setItem('categories', JSON.stringify(categoriesObject));
    localStorage.setItem('categories', JSON.stringify(categoriesObject));
    localStorage.setItem('categories', JSON.stringify(categoriesObject));
    console.log(extractedPurchases);
    console.log(extractedDeposits);
    console.log(extractedBills);
    navigate('/chat-analysis', { state: { initialGoal: financialGoal , extractedPurchases: extractedPurchases, extractedDeposits: extractedDeposits, extractedBills: extractedBills} });
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
                className={`goal-input ${inputError ? 'error' : ''}`}
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
            {inputError && <p className="error-message">Let's start by sharing your financial goal</p>}
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



