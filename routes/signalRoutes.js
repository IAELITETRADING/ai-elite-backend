const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserSignals, downloadSignals } = require('../controllers/signalController');

// Récupérer tous les signaux IA de l'utilisateur connecté
router.get('/', protect, getUserSignals);

// Télécharger en CSV les signaux passés
router.get('/download', protect, downloadSignals);

module.exports = router;
