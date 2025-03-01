import React, { useState } from 'react';
import './SettingsSidebar.css';

const SettingsSidebar = ({ isOpen, onClose, userBankConnected = false, isLoggedIn = false }) => {
  const [timeValue, setTimeValue] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [annualSalary, setAnnualSalary] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState({
    housing: '',
    utilities: '',
    food: '',
    transportation: '',
    healthcare: '',
    insurance: '',
    debt: '',
    savings: '',
    entertainment: '',
    other: ''
  });
  const [savingsGoal, setSavingsGoal] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [emergencyFundGoal, setEmergencyFundGoal] = useState('');
  const [useBankData, setUseBankData] = useState(userBankConnected);

  const handleExpenseChange = (category, value) => {
    setMonthlyExpenses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const preventScroll = (e) => {
    e.preventDefault();
  };

  const calculateTotalExpenses = () => {
    return Object.values(monthlyExpenses).reduce((sum, value) => {
      const numValue = parseFloat(value) || 0;
      return sum + numValue;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create data object with only non-empty values
    const formData = {
      ...(timeValue && timeUnit && { timeFrame: `${timeValue} ${timeUnit}` }),
      ...(annualSalary && { annualSalary }),
      ...(monthlyIncome && { monthlyIncome }),
      // Only include expense categories that have values
      monthlyExpenses: Object.fromEntries(
        Object.entries(monthlyExpenses).filter(([_, value]) => value !== '')
      ),
      ...(savingsGoal && { savingsGoal }),
      ...(retirementAge && { retirementAge }),
      ...(emergencyFundGoal && { emergencyFundGoal }),
      useBankData
    };

    // Remove empty objects
    if (Object.keys(formData.monthlyExpenses).length === 0) {
      delete formData.monthlyExpenses;
    }

    console.log(formData);
    // Handle saving settings to backend with only provided data
  };

  return (
    <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="settings-header">
        <h2>Financial Settings</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section bank-section">
          <h3>Bank Connection</h3>
          <div className="bank-connection-status">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={useBankData}
                onChange={() => setUseBankData(!useBankData)}
                disabled={!userBankConnected}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="connection-text">
              {!userBankConnected ? (
                "No bank account connected"
              ) : (
                useBankData ? "Using bank data" : "Bank data disabled"
              )}
            </span>
          </div>
        </div>

        <div className="settings-section income-section">
          <h3>Income Information</h3>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              onWheel={preventScroll}
              placeholder="Annual Salary"
              className="settings-input"
            />
          </div>
          <div className="input-with-prefix">
            <span className="prefix">$</span>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              onWheel={preventScroll}
              placeholder="Monthly Take-Home Income"
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-section expenses-section">
          <h3>Monthly Expenses</h3>
          <div className="expenses-grid">
            {Object.entries(monthlyExpenses).map(([category, value]) => (
              <div key={category} className="expense-item">
                <label>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleExpenseChange(category, e.target.value)}
                    onWheel={preventScroll}
                    placeholder={category.charAt(0).toUpperCase() + category.slice(1)}
                    className="settings-input"
                  />
                </div>
              </div>
            ))}
            <div className="total-expenses">
              <span>Total Monthly Expenses</span>
              <div className="amount">{calculateTotalExpenses().toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="settings-section goals-section">
          <h3>Financial Goals</h3>
          <div className="goals-grid">
            <div className="goal-item">
              <label>Goal Timeframe</label>
              <div className="time-frame-input">
                <input
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  onWheel={preventScroll}
                  placeholder="Duration"
                  min="0"
                  className="settings-input time-value"
                />
                <select 
                  value={timeUnit} 
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="settings-input time-unit"
                >
                  <option value="months">M</option>
                  <option value="years">Y</option>
                </select>
              </div>
            </div>

            <div className="goal-item">
              <label>Savings Goal</label>
              <div className="input-with-prefix">
                <span className="prefix">$</span>
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  onWheel={preventScroll}
                  placeholder="Target savings amount"
                  className="settings-input"
                />
              </div>
            </div>

            <div className="goal-item">
              <label>Emergency Fund</label>
              <div className="input-with-prefix">
                <span className="prefix">$</span>
                <input
                  type="number"
                  value={emergencyFundGoal}
                  onChange={(e) => setEmergencyFundGoal(e.target.value)}
                  onWheel={preventScroll}
                  placeholder="Emergency fund target"
                  className="settings-input"
                />
              </div>
            </div>

            <div className="goal-item">
              <label>Target Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                onWheel={preventScroll}
                placeholder="Age"
                min="0"
                max="100"
                className="settings-input"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="save-settings-button">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsSidebar; 