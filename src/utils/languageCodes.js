// src/utils/languageCodes.js
export const getSpeechRecognitionLanguageCode = (appLanguage) => {
    const languageMap = {
      'en': 'en-US',    // English
      'hi': 'hi-IN',    // Hindi
      'es': 'es-ES',    // Spanish
      'fr': 'fr-FR',    // French
      'de': 'de-DE',    // German
      'ja': 'ja-JP',    // Japanese
      // Add more mappings as needed
    };
    
    return languageMap[appLanguage] || 'en-US'; // Default to English if no match
  };