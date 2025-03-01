import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked');
  };

  const handleBankConnection = () => {
    // TODO: Implement Plaid or similar bank connection
    console.log('Connect bank account clicked');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Ekewaka</h1>
        <p className="login-description">
          Sign in to access personalized financial planning and insights
        </p>

        {!isLoggedIn ? (
          <div className="auth-section">
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img 
                src="/google-icon.svg" 
                alt="Google" 
                className="google-icon"
              />
              Sign in with Google
            </button>
            <div className="login-divider">
              <span>or</span>
            </div>
            <button className="guest-button" onClick={() => navigate('/')}>
              Continue as Guest
            </button>
          </div>
        ) : (
          <div className="bank-connection-section">
            <h2>Connect Your Bank Account</h2>
            <p>
              Securely connect your bank account to get personalized financial insights
              and recommendations.
            </p>
            <button className="connect-bank-button" onClick={handleBankConnection}>
              Connect Bank Account
            </button>
            <button 
              className="skip-button"
              onClick={() => navigate('/')}
            >
              Skip for Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage; 