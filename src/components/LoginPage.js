import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Google login success:', credentialResponse);

      // Store the token
      localStorage.setItem('auth_token', credentialResponse.credential);
      
      // You would typically send this token to your backend
      // const response = await fetch('your-backend-url/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ token: credentialResponse.credential }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Authentication failed');
      // }
      
      // const data = await response.json();
      // localStorage.setItem('user_data', JSON.stringify(data.user));

      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    setError('Login failed. Please try again.');
    setIsLoading(false);
  };

  const handleBankConnection = () => {
    try {
      // TODO: Implement Plaid or similar bank connection
      console.log('Connect bank account clicked');
      // For now, just navigate to home after "connecting" bank
      navigate('/');
    } catch (err) {
      console.error('Bank connection error:', err);
      setError('Failed to connect bank account. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Ekewaka</h1>
        <p className="login-description">
          Sign in to access personalized financial planning and insights
        </p>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

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
                disabled={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="bank-connection-section">
            <h2>Connect Your Bank Account</h2>
            <p>
              Securely connect your bank account to get personalized financial insights
              and recommendations.
            </p>
            <button 
              className="connect-bank-button" 
              onClick={handleBankConnection}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Bank Account'}
            </button>
            <button 
              className="skip-button"
              onClick={() => navigate('/')}
            >
              Skip for Now
            </button>
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage; 