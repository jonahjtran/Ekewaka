import React, { useState } from 'react';
import './SettingsSidebar.css';

const SettingsSidebar = ({ isOpen, onClose, userBankConnected = false, isLoggedIn = false }) => {
  const [timeValue, setTimeValue] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [budget, setBudget] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [useBankData, setUseBankData] = useState(userBankConnected);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving settings to backend
    console.log({
      timeFrame: `${timeValue} ${timeUnit}`,
      budget,
      savingsGoal,
      riskTolerance,
      useBankData
    });
  };

  return (
    <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="settings-header">
        <h2>Financial Settings</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>Bank Connection</h3>
          <div className="bank-connection-status">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={useBankData}
                onChange={() => setUseBankData(!useBankData)}
                disabled={!isLoggedIn || !userBankConnected}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="connection-text">
              {!isLoggedIn ? (
                "Login to connect bank account"
              ) : userBankConnected ? (
                "Using connected bank data"
              ) : (
                "No bank account connected"
              )}
            </span>
          </div>
          {!userBankConnected && isLoggedIn && (
            <button className="connect-bank-button">
              Connect Bank Account
            </button>
          )}
        </div>

        <div className="settings-section">
          <h3>Goal Time Frame</h3>
          <div className="time-frame-input">
            <input
              type="number"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              placeholder="Enter time period"
              min="0"
              className="settings-input time-value"
            />
            <select 
              value={timeUnit} 
              onChange={(e) => setTimeUnit(e.target.value)}
              className="settings-input time-unit"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Monthly Budget</h3>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your monthly budget"
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Savings Goal</h3>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="Enter your savings goal"
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Risk Tolerance</h3>
          <select 
            value={riskTolerance} 
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="settings-input"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <button type="submit" className="save-settings-button">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsSidebar; 