const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUserTrades,
  addManualTrade
} = require('../controllers/tradeController');

// Récupérer tous les trades de l'utilisateur
router.get('/', protect, getUserTrades);

// Ajouter un trade manuel
router.post('/add', protect, addManualTrade);

module.exports = router;
