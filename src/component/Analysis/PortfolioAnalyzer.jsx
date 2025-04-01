import React, { useState, useRef, useEffect } from 'react';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";

const analysisData = {
  "portfolio": {
    "summary": "Your portfolio shows a 60% allocation in tech stocks, which is higher than the recommended 30% for your risk profile.",
    "diversification": "Consider adding more healthcare and consumer staples to balance your portfolio.",
    "performance": "Your portfolio has grown 12% YTD, outperforming the S&P 500 by 3%."
  },
  "trends": {
    "emerging": "Renewable energy and AI sectors are showing strong growth potential.",
    "declining": "Traditional retail and fossil fuels are underperforming this quarter."
  }
};

function PortfolioAnalyzer() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Portfolio Analyzer! Ask me anything about your portfolio or market trends.",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUserTyping(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsUserTyping(e.target.value.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsUserTyping(false);

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('allocation')) {
      return analysisData.portfolio.summary + "\n\n" + analysisData.portfolio.diversification;
    } else if (lowerQuery.includes('performance')) {
      return analysisData.portfolio.performance;
    } else if (lowerQuery.includes('trend') || lowerQuery.includes('emerging')) {
      return `Current market trends:\n\n${analysisData.trends.emerging}\n\n${analysisData.trends.declining}`;
    } else {
      return "I can analyze your portfolio or discuss market trends. Try asking about:\n- Portfolio allocation\n- Performance metrics\n- Emerging market trends";
    }
  };

  return (
    <div className="w-full h-screen relative bg-gray-100 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] h-[80vh] bg-white shadow-md rounded-[34px] border border-gray-100 flex flex-col">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-[#CACACA] text-[40px] font-normal font-['Aeonik_TRIAL'] leading-[40px] break-words text-center mb-2">
            Portfolio Analyzer
          </h1>
          <p className="text-[#6F6C90] text-lg font-normal font-['Aeonik_TRIAL'] text-center">
            Analysis of your portfolio based on your input
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 ${msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] text-white rounded-br-none shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)]' 
                    : 'bg-gray-100 text-black rounded-bl-none'}`}
                >
                  {msg.text.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Bot Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg rounded-bl-none bg-gray-100 p-4 flex items-center">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-gray-500 text-sm">Analyzer is typing...</span>
                </div>
              </div>
            )}

            {/* User Typing Indicator */}
            {isUserTyping && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-lg rounded-br-none bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] p-4 flex items-center opacity-80">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-white/80 text-sm">You're typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Write your prompt here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button 
              type="submit" 
              className="w-full max-w-[120px] h-[50px] bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] rounded-[45px] shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] flex justify-center items-center text-white text-sm font-normal font-['Aeonik_TRIAL'] leading-4 hover:opacity-90 transition-opacity"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending
                </div>
              ) : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PortfolioAnalyzerApp() {
  const [activeSection, setActiveSection] = useState("PortfolioAnalyzer");

  return (
    <div>
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <PortfolioAnalyzer />
      </DashboardLayout>
    </div>
  );
}

export default PortfolioAnalyzerApp;