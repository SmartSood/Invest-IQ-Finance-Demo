const API_KEY = 'AIzaSyAAvV790SgykzvhGIvBoqYYRh3rwoip_2Q';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const translationCache = new Map();

export const translateText = (text, targetLanguage = 'en') => {
  return new Promise((resolve) => {
    if (!text) {
      resolve('');
      return;
    }
    
    const cacheKey = `${text}-${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      resolve(translationCache.get(cacheKey));
      return;
    }

    fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: 'text'
      })
    })
    .then(response => response.json())
    .then(data => {
      const translatedText = data.data.translations[0].translatedText;
      translationCache.set(cacheKey, translatedText);
      resolve(translatedText);
    })
    .catch(error => {
      console.error('Translation error:', error);
      resolve(text);
    });
  });
};