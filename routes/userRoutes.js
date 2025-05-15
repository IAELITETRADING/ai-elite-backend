const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Signal = require('../models/Signal');

// Middleware auth simple
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, 'secret123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

// Profil simple
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    email: `user${req.user.id}@aielitetrading.com`,
    abonnement: 'premium',
    role: 'user'
  });
});

// 🔥 Historique de signaux IA personnalisés
router.get('/my-signals', authMiddleware, async (req, res) => {
  try {
    const signals = await Signal.find({
      utilisateurCible: req.user.id
    }).sort({ dateGeneration: -1 });

    res.json(signals);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
