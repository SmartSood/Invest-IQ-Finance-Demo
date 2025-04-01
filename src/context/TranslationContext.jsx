import { createContext, useContext, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const translation = useTranslation();

  const value = useMemo(() => translation, [translation]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};