// src/hooks/useTranslation.js
import { useState, useEffect } from 'react';
import { translateText } from '../services/translationService';

export const useTranslation = () => {
  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  const [translations, setTranslations] = useState(() => {
    const saved = localStorage.getItem('appTranslations');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever language or translations change
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    localStorage.setItem('appTranslations', JSON.stringify(translations));
  }, [language, translations]);

  const translate = async (key) => {
    if (language === 'en') return key; // Skip translation for English
    
    // Check cache first
    if (translations[key]?.[language]) {
      return translations[key][language];
    }
    
    try {
      const translatedText = await translateText(key, language);
      setTranslations(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [language]: translatedText
        }
      }));
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  const t = (key) => {
    // Return cached translation if available
    if (translations[key]?.[language]) {
      return translations[key][language];
    }
    
    // Initiate translation in background
    translate(key);
    
    // Return key as fallback (will update when translation completes)
    return key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return { t, language, changeLanguage };
};