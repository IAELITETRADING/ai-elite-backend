const express = require('express');
const router = express.Router();
const { getMyTrades, executeTrade } = require('../controllers/tradeController');
const { protect } = require('../middleware/authMiddleware');

// Protégé : gestion des trades utilisateur
router.get('/', protect, getMyTrades);
router.post('/', protect, executeTrade);

module.exports = router;
