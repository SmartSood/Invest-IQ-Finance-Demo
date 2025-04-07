// src/contexts/XpContext.js
import { createContext, useState, useContext } from 'react';

const XpContext = createContext();

export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState(0);

  return (
    <XpContext.Provider value={{ xp, setXp, badges, setBadges }}>
      {children}
    </XpContext.Provider>
  );
};

export const useXp = () => {
  const context = useContext(XpContext);
  if (!context) {
    throw new Error('useXp must be used within an XpProvider');
  }
  return context;
};