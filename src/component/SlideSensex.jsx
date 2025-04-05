
import React, { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaCog, FaSync } from 'react-icons/fa';
import { restClient } from '@polygon.io/client-js';

export function SlideSensex() {
  const [tickerItems, setTickerItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const tickerContainerRef = useRef(null);
  const tickerRef = useRef(null);

  const fetchStockData = async (force = false) => {
    try {
      // Check cache first
      const cachedData = localStorage.getItem('stockData');
      if (!force && cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Use cache if less than 5 minutes old
        if (Date.now() - timestamp < 300000) {
          setTickerItems(data);
          return;
        }
      }

      // Fetch new data
      const rest = restClient("Phrba88GQnpmJOVroCWAfZJSf_iia4hX");
      const tickers = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT"];
      const results = await Promise.all(
        tickers.map(ticker => 
          rest.stocks.aggregates(ticker, 1, "day", "2023-01-01", "2023-04-14")
        )
      );
      
      const stockData = results.map((data, index) => ({
        name: tickers[index],
        value: data.results[0]?.c || 'N/A',
        change: ((data.results[0]?.c - data.results[0]?.o) || 0).toFixed(2),
      }));

      // Update state and cache
      setTickerItems(stockData);
      localStorage.setItem('stockData', JSON.stringify({
        data: stockData,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('An error happened:', e);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (tickerContainerRef.current) {
          tickerContainerRef.current.scrollLeft += 1;
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Mouse and touch handlers (keep original implementation)
  // ... (keep all the existing mouse/touch handlers unchanged)

  const handleRefresh = () => {
    localStorage.removeItem('stockData');
    fetchStockData(true);
  };

  return (
    <div 
      className="flex items-center  justify-between bg-white p-2 border-b border-gray-300 ticker-container"
      ref={tickerContainerRef}


    >
      <div 
        className={`ticker ${isPaused ? 'paused' : ''}`}
        ref={tickerRef}
      >
        <div className="flex items-center space-x-4">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex items-center space-x-1">
              <span className="font-bold">{item.name}</span>
              <span>{item.value}</span>
              <FaCaretDown className="text-red-600" />
              <span className="text-red-600">{item.change}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
    
}
