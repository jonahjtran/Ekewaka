import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatAnalysisPage.css';

function ChatAnalysisPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const location = useLocation();
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

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
      setShowGraph(true); // Show graph when initial goal is set
    }
  }, [location.state]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show graph when there are messages
  useEffect(() => {
    if (messages.length > 0) {
      setShowGraph(true);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 150);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      const botMessage = {
        text: "Thank you for providing that information. I'm analyzing your budget and goals to provide personalized recommendations. Could you please specify your preferred timeline for achieving this goal?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages([...messages, userMessage, botMessage]);
      setNewMessage('');
      setShowGraph(true); // Show graph when new message is sent
      
      if (textareaRef.current) {
        textareaRef.current.style.height = '45px';
      }
    }
  };

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

  return (
    <div className="chat-analysis-page">
      <div className={`main-content ${showGraph ? 'graph-active' : ''}`}>
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
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="graph-section">
          <div className="graph-container">
            <h3>Budget Comparison</h3>
            <div className="graph-placeholder">
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

      <div className="message-input-section">
        <form onSubmit={handleSubmit} className="message-form">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            className="message-input"
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
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