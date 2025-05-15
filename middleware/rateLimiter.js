const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Trop de requêtes. Réessaie dans quelques minutes.'
});
