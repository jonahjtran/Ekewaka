import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankConnectionPage.css';

function BankConnectionPage({ onBankConnection }) {
  const [bankAccountId, setBankAccountId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!bankAccountId.trim()) {
        setError('Please enter a bank account ID');
        return;
      }
      
      onBankConnection(bankAccountId);
      navigate('/');
    } catch (err) {
      console.error('Bank connection error:', err);
      setError('Failed to connect bank account. Please try again.');
    }
  };

  return (
    <div className="bank-connection-page">
      <div className="bank-connection-container">
        <h1>Connect Your Bank Account</h1>
        <p className="description">
          Connect your bank account to get personalized financial insights and recommendations.
        </p>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bank-form">
          <div className="input-group">
            <label htmlFor="bankAccountId">Bank Account ID</label>
            <input
              id="bankAccountId"
              type="text"
              value={bankAccountId}
              onChange={(e) => {
                setBankAccountId(e.target.value);
                setError(null);
              }}
              placeholder="Enter your bank account ID"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="connect-button">
              Connect Bank Account
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BankConnectionPage; 