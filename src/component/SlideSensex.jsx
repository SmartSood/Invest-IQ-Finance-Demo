// import React, { useRef, useState } from 'react';
// import { FaCaretDown, FaCog } from 'react-icons/fa';
// import { restClient } from '@polygon.io/client-js';
// export function SlideSensex(){
//     const rest = restClient("Z8ibIcFppismVIMUpf1b8UYlxUyCmzkD");
//     rest.stocks.aggregates("AAPL", 1, "day", "2023-01-01", "2023-04-14").then((data) => {
//         console.log(data);
//     }).catch(e => {
//         console.error('An error happened:', e);
//     });
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
  
//   const tickerContainerRef = useRef(null);
//   const tickerRef = useRef(null);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - tickerContainerRef.current.offsetLeft);
//     setScrollLeft(tickerContainerRef.current.scrollLeft);
//     tickerContainerRef.current.style.cursor = 'grabbing';
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     tickerContainerRef.current.style.cursor = 'grab';
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     tickerContainerRef.current.style.cursor = 'grab';
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - tickerContainerRef.current.offsetLeft;
//     const walk = (x - startX) * 2;
//     tickerContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     setStartX(e.touches[0].pageX - tickerContainerRef.current.offsetLeft);
//     setScrollLeft(tickerContainerRef.current.scrollLeft);
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const x = e.touches[0].pageX - tickerContainerRef.current.offsetLeft;
//     const walk = (x - startX) * 2;
//     tickerContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const toggleTicker = () => {
//     setIsPaused(!isPaused);
//   };

//   const tickerItems = [
//     { name: 'SENSEX', value: '77414.92', change: '-191.51 (-0.25%)' },
//     { name: 'NIFTY 50', value: '23519.35', change: '-72.6 (-0.31%)' },
//     { name: 'NIFTY BANK', value: '51564.85', change: '-11 (-0.02%)' },
//     { name: 'NIFTY Midcap 100', value: '51672.25', change: '-167.15 (-0.32%)' },
//   ];

//   return (
//     <div 
//       className="flex items-center justify-between bg-white p-2 border-b border-gray-300 ticker-container"
//       ref={tickerContainerRef}
//       onClick={toggleTicker}
//       onMouseDown={handleMouseDown}
//       onMouseLeave={handleMouseLeave}
//       onMouseUp={handleMouseUp}
//       onMouseMove={handleMouseMove}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//       onTouchMove={handleTouchMove}
//     >
//       <div 
//         className={`ticker ${isPaused ? 'paused' : ''}`}
//         ref={tickerRef}
//       >
//         <div className="flex items-center space-x-4">
//           {/* Render ticker items twice for continuous effect */}
//           {[...tickerItems, ...tickerItems].map((item, index) => (
//             <div key={`${item.name}-${index}`} className="flex items-center space-x-1">
//               <span className="font-bold">{item.name}</span>
//               <span>{item.value}</span>
//               <FaCaretDown className="text-red-600" />
//               <span className="text-red-600">{item.change}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center space-x-2">
//         <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
//         <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//         <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//         <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//         <FaCog className="text-gray-600" />
//       </div>
//     </div>
//   );
// // };
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
      className="flex items-center justify-between bg-white p-2 border-b border-gray-300 ticker-container"
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
//import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { FaCaretDown, FaCog, FaSync, FaExclamationTriangle } from 'react-icons/fa';
// import { restClient } from '@polygon.io/client-js';

// // Note: In production, use environment variables instead of hardcoding API keys
// const API_KEY = "Phrba88GQnpmJOVroCWAfZJSf_iia4hX"; 

// const useStockAPI = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const getPreviousTradingDay = () => {
//     const date = new Date();
//     let daysToSubtract = 1;
    
//     // Adjust for weekends
//     if (date.getDay() === 0) daysToSubtract = 2; // Sunday -> Friday
//     else if (date.getDay() === 1) daysToSubtract = 3; // Monday -> Friday
    
//     date.setDate(date.getDate() - daysToSubtract);
//     return date.toISOString().split('T')[0];
//   };

//   const fetchData = useCallback(async (force = false) => {
//     const CACHE_KEY = 'polygonStockData_v2';
    
//     try {
//       // Check cache first (5 minutes expiry)
//       const cached = localStorage.getItem(CACHE_KEY);
//       const now = Date.now();
      
//       if (!force && cached) {
//         const parsedCache = JSON.parse(cached);
//         if (parsedCache?.data && Array.isArray(parsedCache.data) && now - parsedCache.timestamp < 300000) {
//           setData(parsedCache.data);
//           setLastUpdated(parsedCache.timestamp);
//           return;
//         }
//       }

//       setLoading(true);
//       setError(null);
      
//       const rest = restClient(API_KEY);
//       const tickers = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT"];
//       const formattedDate = getPreviousTradingDay();
      
//       // Implement rate limiting by spacing out requests
//       const results = [];
//       for (let i = 0; i < tickers.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, i * 500)); // 500ms between requests
//         try {
//           const response = await rest.stocks.aggregates(
//             tickers[i], 
//             1, 
//             "day", 
//             formattedDate, 
//             formattedDate,
//             { limit: 1 }
//           );
//           results.push(response);
//         } catch (err) {
//           console.error(`Failed to fetch ${tickers[i]}:`, err);
//           results.push({ results: [] });
//         }
//       }

//       const stockData = results
//         .filter(result => result.results?.length > 0)
//         .map((result, index) => {
//           const latest = result.results[0];
//           const prevClose = latest.c || 0;
//           const open = latest.o || 0;
//           const change = prevClose - open;
//           const changePercent = (change / open) * 100;

//           return {
//             name: tickers[index],
//             value: prevClose.toFixed(2),
//             change: change.toFixed(2),
//             changePercent: changePercent.toFixed(2),
//             direction: change >= 0 ? 'up' : 'down'
//           };
//         });

//       if (stockData.length > 0) {
//         setData(stockData);
//         setLastUpdated(now);
//         localStorage.setItem(CACHE_KEY, JSON.stringify({
//           data: stockData,
//           timestamp: now
//         }));
//       } else {
//         throw new Error('No valid stock data received');
//       }
//     } catch (err) {
//       console.error('API Error:', err);
//       setError(err.message || 'Failed to fetch stock data');
      
//       // Fallback to cache
//       const cached = localStorage.getItem(CACHE_KEY);
//       if (cached) {
//         try {
//           const parsedCache = JSON.parse(cached);
//           if (parsedCache?.data && Array.isArray(parsedCache.data)) {
//             setData(parsedCache.data);
//             setLastUpdated(parsedCache.timestamp);
//           }
//         } catch (e) {
//           console.error('Cache parse error:', e);
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { data, loading, error, fetchData, lastUpdated };
// };

// export function SlideSensex() {
//   const { data = [], loading, error, fetchData, lastUpdated } = useStockAPI();
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const tickerContainerRef = useRef(null);
//   const scrollInterval = useRef(null);

//   // Auto-scroll effect
//   useEffect(() => {
//     if (!isPaused && tickerContainerRef.current && data.length > 0) {
//       scrollInterval.current = setInterval(() => {
//         if (tickerContainerRef.current) {
//           const { scrollWidth, clientWidth, scrollLeft } = tickerContainerRef.current;
//           const newScrollLeft = scrollLeft >= scrollWidth - clientWidth ? 0 : scrollLeft + 1;
//           tickerContainerRef.current.scrollLeft = newScrollLeft;
//         }
//       }, 30);
//     }
//     return () => {
//       if (scrollInterval.current) clearInterval(scrollInterval.current);
//     };
//   }, [isPaused, data]);

//   // Initial load
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Drag handlers
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (tickerContainerRef.current?.offsetLeft || 0));
//     setScrollLeft(tickerContainerRef.current?.scrollLeft || 0);
//     if (tickerContainerRef.current) {
//       tickerContainerRef.current.style.cursor = 'grabbing';
//     }
//   };

//   const handleMove = useCallback((clientX) => {
//     if (!isDragging || !tickerContainerRef.current) return;
//     const x = clientX - (tickerContainerRef.current.offsetLeft || 0);
//     const walk = (x - startX) * 2;
//     tickerContainerRef.current.scrollLeft = scrollLeft - walk;
//   }, [isDragging, startX, scrollLeft]);

//   const handleMouseMove = (e) => {
//     e.preventDefault();
//     handleMove(e.pageX);
//   };

//   const handleTouchMove = (e) => {
//     handleMove(e.touches[0].clientX);
//   };

//   const endDrag = useCallback(() => {
//     setIsDragging(false);
//     if (tickerContainerRef.current) {
//       tickerContainerRef.current.style.cursor = 'grab';
//     }
//   }, []);

//   const handleRefresh = () => {
//     // Only allow refresh if not already loading and if last update was more than 30 seconds ago
//     if (!loading && (!lastUpdated || (Date.now() - lastUpdated > 30000))) {
//       fetchData(true);
//     }
//   };

//   if (loading && data.length === 0) {
//     return (
//       <div className="flex items-center justify-between bg-white p-2 border-b border-gray-300">
//         <div className="text-gray-500">Loading market data...</div>
//       </div>
//     );
//   }

//   if (error && data.length === 0) {
//     return (
//       <div className="flex items-center justify-between bg-white p-2 border-b border-gray-300">
//         <div className="flex items-center text-red-500">
//           <FaExclamationTriangle className="mr-2" />
//           {error}
//         </div>
//         <button 
//           onClick={handleRefresh}
//           className="text-blue-500 hover:text-blue-700"
//           disabled={loading}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="flex items-center justify-between bg-white p-2 border-b border-gray-300 ticker-container"
//       ref={tickerContainerRef}
//       onMouseDown={handleMouseDown}
//       onMouseLeave={endDrag}
//       onMouseUp={endDrag}
//       onMouseMove={handleMouseMove}
//       onTouchStart={handleMouseDown}
//       onTouchEnd={endDrag}
//       onTouchMove={handleTouchMove}
//       style={{ 
//         cursor: isDragging ? 'grabbing' : 'grab',
//         overflowX: 'auto',
//         whiteSpace: 'nowrap',
//         userSelect: 'none'
//       }}
//     >
//       <div className="flex items-center space-x-4">
//         {data.map((item, index) => (
//           <div key={`${item.name}-${index}`} className="flex items-center space-x-1">
//             <span className="font-bold">{item.name}</span>
//             <span>${item.value}</span>
//             {item.direction === 'up' ? (
//               <FaCaretDown className="text-green-600 transform rotate-180" />
//             ) : (
//               <FaCaretDown className="text-red-600" />
//             )}
//             <span className={item.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
//               {Math.abs(Number(item.change))} ({Math.abs(Number(item.changePercent))}%)
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center space-x-2 ml-4">
//         <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500' : 'bg-blue-600'}`} />
//         <FaSync 
//           className={`text-gray-600 cursor-pointer ${loading ? 'animate-spin' : 'hover:text-blue-600'}`}
//           onClick={handleRefresh}
//           disabled={loading}
//         />
//         <div className="w-3 h-3 bg-gray-300 rounded-full" />
//         <FaCog 
//           className={`text-gray-600 cursor-pointer ${isPaused ? 'text-blue-600' : 'hover:text-blue-600'}`}
//           onClick={() => setIsPaused(!isPaused)}
//         />
//       </div>
//     </div>
//   );
// }