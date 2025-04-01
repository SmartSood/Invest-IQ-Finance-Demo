// src/services/polygonService.js
import { restClient } from '@polygon.io/client-js';

// Initialize the client once
const client = restClient("Z8ibIcFppismVIMUpf1b8UYlxUyCmzkD");

export const getMarketSnapshot = async () => {
  try {
    const response = await client.stocks.snapshotAllTickers();
    return response.tickers || [];
  } catch (error) {
    console.error('Polygon API Error:', error);
    throw error;
  }
};

export const getIndianIndices = async () => {
  const symbols = ['I:BSESN', 'I:NIFTY', 'I:NIFTYBANK'];
  const allTickers = await getMarketSnapshot();
  
  return allTickers.filter(ticker => 
    symbols.includes(ticker.ticker)
  ).map(ticker => formatTickerData(ticker));
};

const formatTickerData = (ticker) => {
  const dayData = ticker.day || {};
  const prevDayData = ticker.prevDay || {};
  
  const currentPrice = dayData.c || prevDayData.c || 0;
  const change = dayData.c - prevDayData.c || 0;
  const changePercent = prevDayData.c ? (change / prevDayData.c * 100) : 0;

  return {
    name: getIndexName(ticker.ticker),
    symbol: ticker.ticker,
    value: currentPrice.toLocaleString('en-IN'),
    change: change.toFixed(2),
    changePercent: changePercent.toFixed(2) + '%',
    isPositive: change >= 0
  };
};

const getIndexName = (symbol) => {
  const names = {
    'I:BSESN': 'SENSEX',
    'I:NIFTY': 'NIFTY 50',
    'I:NIFTYBANK': 'NIFTY BANK'
  };
  return names[symbol] || symbol;
};

// Alternatively, you can export everything at once:
// export default { getMarketSnapshot, getIndianIndices };