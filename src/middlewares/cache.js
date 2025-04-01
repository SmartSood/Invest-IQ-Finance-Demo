// middlewares/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 5 }); // 5 minute cache

module.exports = (key, ttl) => {
  return async (req, res, next) => {
    const cachedData = cache.get(key);
    if (cachedData) {
      req.cachedData = cachedData;
      return next();
    }
    
    req.cacheKey = key;
    req.cacheTTL = ttl;
    next();
  };
};