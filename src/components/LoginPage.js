import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // TODO: Send the credential to your backend
    setIsLoggedIn(true);
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const handleBankConnection = () => {
    // TODO: Implement Plaid or similar bank connection
    console.log('Connect bank account clicked');
    // For now, just navigate to home after "connecting" bank
    navigate('/');
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
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                shape="rectangular"
                text="signin_with"
                size="large"
              />
            </div>
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