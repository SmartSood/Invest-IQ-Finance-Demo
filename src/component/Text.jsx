import React, { useEffect, useState } from 'react';
import { useTranslationContext } from '../context/TranslationContext';

const TranslatorText = ({ children }) => {
  const { t, language } = useTranslationContext();
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    if (typeof children !== 'string') return;
    
    // Always update the display text when language changes
    const updateText = async () => {
      if (language === 'en') {
        // If switching back to English, show original text immediately
        setDisplayText(children);
      } else {
        // For other languages, get translation
        const translated = await t(children);
        setDisplayText(translated);
      }
    };

    updateText();
  }, [children, language, t]);

  return <>{displayText}</>;
};

export default TranslatorText;