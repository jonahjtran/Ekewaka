import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { context } from './context/context';
import './ChatAnalysisPage.css';

function ChatAnalysisPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const location = useLocation();
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { onSent } = useContext(context);

  useEffect(() => {
    // Handle initial goal from landing page
    const handleInitialGoal = async () => {
      if (location.state?.initialGoal) {
        const initialGoal = location.state.initialGoal;
        
        // Add initial user message
        const userMessage = {
          text: initialGoal,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages([userMessage]);
        
        try {
          const initialResponse = await onSent(initialGoal);
          // Add initial bot response
          const botMessage = {
            text: initialResponse || "I understand you want to achieve this financial goal. Let me analyze it and provide some recommendations. Could you please share your current monthly income and major expenses?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          
          setMessages(prev => [...prev, botMessage]);
          setShowGraph(true); // Show graph when initial goal is set
        } catch (error) {
          console.error("Error getting initial response:", error);
        }
      }
    };

    handleInitialGoal();
  }, [location.state, onSent]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Immediately add user message and clear input
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '45px';
      }
      
      try {
        console.log("Sending message:", userMessage.text);
        
        // Show loading state
        const loadingMessage = {
          text: "Thinking...",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
          isLoading: true
        };
        setMessages(prev => [...prev, loadingMessage]);
        
        const response = await onSent(userMessage.text);
        console.log("Received response:", response);
        
        if (!response) {
          throw new Error("Empty response received from Gemini");
        }
        
        // Remove loading message and add actual response
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            text: response,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          }];
        });
      } catch (error) {
        console.error("Detailed chat error:", {
          error: error.message,
          stack: error.stack,
          message: userMessage.text
        });
        
        // Remove loading message and add error message
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, {
            text: `Error: ${error.message || "Unable to get a response. Please check your API key and try again."}`,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
            isError: true
          }];
        });
      }
      
      setShowGraph(true);
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