import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

function LoginPage({ isLoggedIn, onLogin, onBankConnection }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Google login success:', credentialResponse);
      onLogin(credentialResponse.credential);
      navigate('/');
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
      </div>
    </div>
  );
}

export default LoginPage; 