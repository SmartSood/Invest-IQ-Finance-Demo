import { useState, useEffect, useCallback } from 'react';
import { translateText, batchTranslate } from '../services/translationService';

export const useGoogleTranslate = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);
  const [isTranslating, setIsTranslating] = useState(false);

  const t = useCallback(async (text) => {
    if (typeof text !== 'string') return text;
    if (language === 'en') return text; // Skip translation if target is English
    
    setIsTranslating(true);
    try {
      const translated = await translateText(text, language);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  return { t, language, changeLanguage, isTranslating };
};