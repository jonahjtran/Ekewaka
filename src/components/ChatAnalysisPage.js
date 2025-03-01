import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatAnalysisPage.css';

function ChatAnalysisPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Handle initial goal from landing page
    if (location.state?.initialGoal) {
      const initialGoal = location.state.initialGoal;
      // Add initial user message
      const userMessage = {
        text: initialGoal,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Add initial bot response
      const botMessage = {
        text: "I understand you want to achieve this financial goal. Let me analyze it and provide some recommendations. Could you please share your current monthly income and major expenses?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages([userMessage, botMessage]);
    }
  }, [location.state]);

  // Dummy data for the graphs - replace with real data later
  const dummyBudgetData = {
    oldBudget: {
      housing: 1500,
      food: 500,
      transportation: 300,
      utilities: 200,
      entertainment: 200
    },
    newBudget: {
      housing: 1400,
      food: 400,
      transportation: 250,
      utilities: 180,
      entertainment: 150
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add user message
      const userMessage = {
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Simulate bot response (replace with actual API call later)
      const botMessage = {
        text: "Thank you for providing that information. I'm analyzing your budget and goals to provide personalized recommendations. Could you please specify your preferred timeline for achieving this goal?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages([...messages, userMessage, botMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-analysis-page">
      <div className="main-content">
        {/* Left side - Chat */}
        <div className="chat-section">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Graphs */}
        <div className="graph-section">
          <div className="graph-container">
            <h3>Budget Comparison</h3>
            <div className="graph-placeholder">
              {/* Replace with actual graph component */}
              <p>Budget visualization will go here</p>
              <div className="budget-legend">
                <div className="legend-item">
                  <span className="old-budget-color"></span>
                  <p>Current Budget</p>
                </div>
                <div className="legend-item">
                  <span className="new-budget-color"></span>
                  <p>Proposed Budget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Message Input */}
      <div className="message-input-section">
        <form onSubmit={handleSubmit} className="message-form">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
            rows="1"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatAnalysisPage; 