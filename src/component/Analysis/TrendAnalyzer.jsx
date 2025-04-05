

import React, { useState, useRef, useEffect } from 'react';
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { Client } from "@gradio/client";
import Plot from 'react-plotly.js';
import { FiMaximize2, FiMinimize2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { Chatbot } from '../ChatBot';
import AI_Avatar from '../../assets/AI_Avatar.png'
import person from '../../assets/person.svg'
function TrendAnalyzer() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Stock Analyzer! Please enter a stock ticker (e.g., RELIANCE.NS, TCS.NS) and select analysis period.",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [ticker, setTicker] = useState('RELIANCE.NS');
  const [period, setPeriod] = useState('6mo');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef(null);
  const [client, setClient] = useState(null);
  const [currentCharts, setCurrentCharts] = useState(null);

  const periodOptions = [
    { value: '1mo', label: '1 Month' },
    { value: '3mo', label: '3 Months' },
    { value: '6mo', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const newClient = await Client.connect("ayushraj0906/StockAnalyzer");
        setClient(newClient);
        addBotMessage("Connected to stock analysis service. Ready to analyze!");
      } catch (error) {
        console.error("Error connecting to API:", error);
        addBotMessage("Service temporarily unavailable. Please try again later.");
      }
    };
    initializeClient();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentCharts]);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { 
      text, 
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { 
      text, 
      sender: 'user',
      timestamp: new Date().toISOString()
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) {
      addBotMessage("Please enter a valid stock ticker (e.g., RELIANCE.NS, TCS.NS)");
      return;
    }

    const userQuery = `Analyze ${ticker} for ${getPeriodDisplay(period)}`;
    addUserMessage(userQuery);
    setIsLoading(true);
    setCurrentCharts(null); // Clear previous charts before loading new ones

    try {
      const response = await client.predict("/predict", [ticker, period]);
      
      const [analysisReport, priceChart, rsiChart, macdChart] = response.data;
      
      addBotMessage(analysisReport);
      
      const newChartData = {
        id: Date.now(),
        ticker,
        period,
        timestamp: new Date().toISOString(),
        priceChart: JSON.parse(priceChart.plot),
        rsiChart: JSON.parse(rsiChart.plot),
        macdChart: JSON.parse(macdChart.plot)
      };
      
      setCurrentCharts(newChartData);

    } catch (error) {
      console.error("Error analyzing stock:", error);
      addBotMessage(`Error analyzing ${ticker}. Please check the ticker format (e.g., RELIANCE.NS) and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Chat cleared. Ready for new analysis.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
    setCurrentCharts(null); // Clear all charts
  };

  const getPeriodDisplay = (periodValue) => {
    const periodObj = periodOptions.find(opt => opt.value === periodValue);
    return periodObj ? periodObj.label : periodValue;
  };

  const renderChart = (chartJson, title, chartType) => {
    if (!chartJson) return null;
    
    const handleViewInNewTab = () => {
      const newWindow = window.open('', '_blank');
      const chartHtml = `
        <html>
          <head>
            <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            <style>
              body { margin: 0; padding: 20px; }
              #chart { width: 100%; height: 90vh; }
            </style>
          </head>
          <body>
            <h2>${title}</h2>
            <div id="chart"></div>
            <script>
              Plotly.newPlot('chart', ${JSON.stringify(chartJson.data)}, ${JSON.stringify({
                ...chartJson.layout,
                title: title,
                autosize: true,
                margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 }
              })});
            </script>
          </body>
        </html>
      `;
      newWindow.document.write(chartHtml);
    };

    return (
      <div className="relative h-full">
        <button 
          onClick={handleViewInNewTab}
          className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          title="Open in new tab"
        >
          <FiExternalLink className="text-gray-600" />
        </button>
        <Plot
          data={chartJson.data}
          layout={{
            ...chartJson.layout,
            title: null,
            autosize: true,
            margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 }
          }}
          config={{ 
            responsive: true,
            displayModeBar: true,
            displaylogo: false
          }}
          style={{ width: '100%', height: '100%', minHeight: '300px' }}
          useResizeHandler={true}
        />
      </div>
    );
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const [activeSection, setActiveSection] = useState("Analysis");

  return (
    <div className="w-full   flex flex-col ">
      {!isMaximized && <Navbar />}
      {!isMaximized && (
          
        <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
          <div className="flex-1 py-100 relative">
      
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[1200px] h-[105vh]  flex flex-col">
                {/* Header Section with Controls */}
                <div className="p-2  flex justify-end content-center items-center">
                  <div>
                    <h1 className="text-[#CACACA] text-[40px] w-250 font-['Aeonik_TRIAL'] leading-[40px] break-words justify- text-center mb-2">
                       Stock Analyzer
                     
                    </h1>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={clearChat}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      title="Clear chat"
                    >
                      <FiTrash2 size={20} />
                    </button>
                    <button 
                      onClick={toggleMaximize}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Maximize"
                    >
                      <FiMaximize2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Chat Container */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    

                    {messages.map((msg, index) => (
                      
                                             
                      <div 
                        key={`msg-${index}-${msg.timestamp}`} 
                        className={`flex  items-start`}
                      >
                        <div className='px-2 items-center justify-self-center'>  {msg.sender==='user'?<img src={person} alt="" className='w-[] h-11  bg-white rounded-[100%] justify-self-center'/>:<img src={AI_Avatar} alt="" className='w-[] h-11   justify-self-center' />} </div>
                    
                        <div 
                          className={` rounded-lg p-4 ${msg.sender === 'user' 
                            ? 'bg-white max-w-[100%] text-black rounded' 
                            : 'bg-white w-[100%]  text-black rounded'}`}
                        >
                          {msg.text.split('\n').map((paragraph, i) => (
                           <div className='flex'><p key={i} className="mb-2 last:mb-0">{paragraph}</p></div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Display Current Charts */}
                    {currentCharts && (
                      <div key={`chart-${currentCharts.id}`} className="mt-6 space-y-4">
                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Analysis for {currentCharts.ticker} ({getPeriodDisplay(currentCharts.period)}) - 
                            <span className="text-sm font-normal text-gray-500 ml-2">
                              {new Date(currentCharts.timestamp).toLocaleString()}
                            </span>
                          </h3>
                          
                          <div className=" gap-6">
                            <br />
                            <div className="bg-white h-[px] p-4 border border-gray-200 rounded-lg ">
                              <h4 className="font-medium mb-2">Price Chart</h4>
                              {renderChart(currentCharts.priceChart, `${currentCharts.ticker} Price`, 'price')}
                            </div>
          
                        <br />
                            <div className="bg-white p-4 border border-gray-200 rounded-lg h-[px]">
                              <h4 className="font-medium mb-2">RSI Chart</h4>
                              {renderChart(currentCharts.rsiChart, `${currentCharts.ticker} RSI`, 'rsi')}
                            </div>
                            <br />
                            <div className="bg-white p-4 border border-gray-200 rounded-lg  h-[px]">
                              <h4 className="font-medium mb-2">MACD Chart</h4>
                              {renderChart(currentCharts.macdChart, `${currentCharts.ticker} MACD`, 'macd')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Loading Indicator */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg rounded-bl-none bg-gray-100 p-4 flex items-center">
                          <div className="flex space-x-1 mr-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <span className="text-gray-500 text-sm">Fetching analysis for {ticker}...</span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <div className=" border-t border-gray-200">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="Stock ticker (e.g., RELIANCE.NS, TCS.NS)"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        {periodOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
        
                    </div>
                    <button 
                      type="submit" 
                      className="w-full h-[50px] bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] rounded-[45px] shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] flex justify-center items-center text-white text-sm font-normal font-['Aeonik_TRIAL'] leading-4 hover:opacity-90 transition-opacity"
                      disabled={isLoading || !ticker.trim()}
                    >
                                 {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-[px] w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </div>
                      ) : 'Analyze Stock'}
                    </button>
           
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      )}

      {/* Maximized View */}
      {isMaximized && (
        <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">
          <div className="p-4  flex justify-between items-center">
            <div></div>
          <h1 className="text-[#CACACA] text-[40px] w-250 font-['Aeonik_TRIAL'] leading-[40px] break-words items-center  text-center mb-2">
                       Stock Analyzer
                     
                    </h1>
            <div className="flex gap-2">
              <button 
                onClick={clearChat}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Clear chat"
              >
                <FiTrash2 size={20} />
              </button>
              <button 
                onClick={toggleMaximize}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Minimize"
              >
                <FiMinimize2 size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              
              {messages.map((msg, index) => (
                <div 
                  key={`msg-${index}-${msg.timestamp}`} 
                  className={`flex items-start`}
                >
                     {msg.sender==='user'?<img src={person} alt="" className='w-[] h-12 px-2 justify-self-center'/>:<img src={AI_Avatar} alt="" className='w-[] h-12  px-2 justify-self-center' />} 
                  <div 
                    // className={` rounded-lg p-4 ${msg.sender === 'user' 
                    //   ? 'bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] text-white rounded-br-none shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)]' 
                    //   : 'bg-gray-100 text-black rounded-bl-none'}`}
                    className={` rounded-lg p-4 ${msg.sender === 'user' 
                    ? 'bg-white max-w-[100%] text-black rounded' 
                    : 'bg-white w-[100%] text-black rounded'}`}
                  >
                    {msg.text.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Display Current Charts */}
              {currentCharts && (
                <div key={`chart-${currentCharts.id}`} className="mt-6 space-y-4">
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Analysis for {currentCharts.ticker} ({getPeriodDisplay(currentCharts.period)}) - 
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        {new Date(currentCharts.timestamp).toLocaleString()}
                      </span>
                    </h3>
                    
                    <div className="py-2">
                      <div className="bg-white p-4 border border-gray-200 rounded-lg h-[px] ">
                        <h4 className="font-medium mb-2">Price Chart</h4>
                        {renderChart(currentCharts.priceChart, `${currentCharts.ticker} Price`, 'price')}
                      </div>
                      
                      <div className="bg-white p-4 border border-gray-200 justify-center items-center rounded-lg h-[px]">
                        <h4 className="font-medium justify-center items-center mb-2">RSI Chart</h4>
                        {renderChart(currentCharts.rsiChart, `${currentCharts.ticker} RSI`, 'rsi')}
                      </div>
                      
                      <div className="bg-white p-4 border border-gray-200 rounded-lg  h-[px]">
                        <h4 className="font-medium mb-2">MACD Chart</h4>
                        {renderChart(currentCharts.macdChart, `${currentCharts.ticker} MACD`, 'macd')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg rounded-bl-none bg-gray-100 p-4 flex items-center">
                    <div className="flex space-x-1 mr-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-gray-500 text-sm">Fetching analysis for {ticker}...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="Stock ticker (e.g., RELIANCE.NS, TCS.NS)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {periodOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full h-[50px] bg-gradient-to-br from-[#4A25E1] to-[#7B5AFF] rounded-[45px] shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] flex justify-center items-center text-white text-sm font-normal font-['Aeonik_TRIAL'] leading-4 hover:opacity-90 transition-opacity"
                disabled={isLoading || !ticker.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : 'Analyze Stock'}
              </button>
            </form>
          </div>
        </div>
      )}
      <Chatbot/>
    </div>
  );
}

export default TrendAnalyzer;