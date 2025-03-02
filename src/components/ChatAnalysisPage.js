import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { context } from './context/context';
import './ChatAnalysisPage.css';
import { handleData } from './GraphsJS.js';
import { sumOfList } from './GraphsJS.js';




import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

<iframe src="/Graphs.html" width="600" height="400" style="border: none;"></iframe>

function ChatAnalysisPage({ userBankConnected }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const location = useLocation();
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { onSent } = useContext(context);
  const [chartImage, setChartImage] = useState(null); ///////////////////////////////

  ///////////////////////////////////////
  useEffect(() => {
    const imgURL = localStorage.getItem("chartImage");
    if (imgURL) {
      setChartImage(imgURL);
    }
  }, []);
  //////////////////////////////////////////



  useEffect(() => {
    // Handle initial goal from landing page
    const handleInitialGoal = async () => {
      if (location.state?.initialGoal) {
        const initialGoal = location.state.initialGoal;
        const purchasesString = location.state.extractedPurchases.map(p => 
          `Purchase of $${p.amount} at ${p.merchant_id} on ${p.purchase_date}`
        ).join('. ');
        const depositsString = location.state.extractedDeposits.map(d =>
          `Deposit of $${d.amount} on ${d.transaction_date}`
        ).join('. ');
        const billsString = location.state.extractedBills.map(b =>
          `Bill payment of $${b.payment_amount} to ${b.payee} due on ${b.payment_date}`
        ).join('. ');
        
        const dataString = `Here is your financial data:\n\nPurchases: ${purchasesString}`;
        const categories = await onSent("This is related to financial purposes.  Please analyze this data and decide on a series of spending categories.  Then, organize each company into a category.  Please output this information as a map of the format {category: [company1, company2, ...], category2: [company1, company2, ...]}."  + dataString );
        const start = categories.indexOf('{');
        const end = categories.indexOf('}',start)+1;
        const cleanedString = categories.substring(start,end);
        const categoriesObject = JSON.parse(cleanedString);
        console.log("ASDFSDFSDF",categoriesObject);
            
        localStorage.setItem('categories', JSON.stringify(categoriesObject));
        // Add initial user message
        const userMessage = {
          text: initialGoal,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString()
        };
        

        // const userSettings = JSON.parse(localStorage.getItem('User Settings'));


        setMessages([userMessage]);
        
        try {
          var initialResponse = await onSent("Here is the goal that I am trying to achieve: " + initialGoal + ".  Here is the data that I have collected on purchases, deposits (income), and bills: " + purchasesString + ", " + depositsString + ", " + billsString +  ".  Please tell me how I can change my spending habits to achieve this goal.");
          if (!userBankConnected) {
            initialResponse = await onSent("Here is the goal that I am trying to achieve: " + initialGoal + ".  Here is the financial data that I have collected: " + localStorage.getItem('User Settings') + ".  Please tell me how I can change my spending habits to achieve this goal.");
          }
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
        // const userSettings = JSON.parse(localStorage.getItem('User Settings'));
        // console.log("User Settings:", userSettings);
        
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

  const convertMapToArray = (map) => {
    // let keys = Array.from(map.keys());
    // let result = sumOfList(Array.from(map.values()))
    // let changedMap = new Map();
    // for (let i = 0 ; i < keys.length; i++){
    //   if(result[i] == 0){
    //     continue;
    //   }
    //   changedMap.set(keys[i], result[i]);
    // }
    // return Array.from(changedMap, ([name, value]) => ({ name, value }));
    const sortedMap = new Map([...map.entries()].sort(([, valueA], [, valueB]) => valueA - valueB));
    let keys = Array.from(map.keys());
    let result = sumOfList(Array.from(sortedMap.values()))
    let changedMap = new Map();
    let fillColors = [];
    let colorStart = 35070;
    for (let i = 0 ; i < keys.length; i++){
      if(result[i] == 0){
        continue;
      }
      let newColor = (colorStart.toString(16));
      if(newColor.length < 6){
        let temp = "0";
        newColor = (temp.repeat(6 - newColor.length)) + newColor;
      }
      fillColors.push(("#" + newColor));
      changedMap.set(keys[i], result[i]);
      colorStart += 10000;
    }
    return [Array.from(changedMap, ([name, value]) => ({ name, value })), fillColors];

  };
  const totalResult = handleData();
  const overallMap = totalResult[0];
  const totalDeposits = totalResult[1];
  const arrayResults = convertMapToArray(overallMap);
  const pieChartData = arrayResults[0];
  const pieColors = arrayResults[1];
  console.log("Pie Colors");
  console.log(pieColors);

  return (
    <div className="chat-analysis-page">
      <div className={`main-content ${showGraph ? 'graph-active' : ''}`}>
        <div className="chat-section">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p dangerouslySetInnerHTML={{ __html: message.text }} />
                  <span className="timestamp">{message.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="graph-section">
          <div className="graph-container">
            {/* <h3>Budget Comparison</h3> */}
            <h3>Breakdown of Current Spending (As a Percentage)</h3>
            <div className="graph-placeholder">
            <ResponsiveContainer width="100%" height={600}>
              <PieChart>
                <Pie 
                  data={pieChartData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={190} 
                  fill="#8884d8"
                  label
                >
                  {/* Colors for different categories */}
                  {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"][index % 5]} />
                  // <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
              <div className="budget-legend">
                <div className="legend-item">
                  {/* <span className="old-budget-color"></span>
                  <p>Current Budget</p>
                </div>
                <div className="legend-item">
                  <span className="new-budget-color"></span> */}
                  {/* <p>Proposed Budget</p> */}
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