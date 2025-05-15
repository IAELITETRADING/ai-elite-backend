const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdmin } = require('../middleware/authMiddleware');

// Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Supprimer un utilisateur
router.delete('/user/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

// Bloquer ou débloquer un utilisateur
router.patch('/user/block/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `Utilisateur ${user.isBlocked ? 'bloqué' : 'débloqué'} avec succès` });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du blocage/déblocage' });
  }
});

// Activer / désactiver l'abonnement et définir une date de fin
router.patch('/user/subscription/:id', isAdmin, async (req, res) => {
  const { isSubscribed, subscriptionEnd } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.isSubscribed = isSubscribed;
    user.subscriptionEnd = subscriptionEnd || null;
    await user.save();
    res.json({ message: 'Abonnement mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’abonnement' });
  }
});

// Promouvoir ou rétrograder un utilisateur admin
router.patch('/user/admin/:id', isAdmin, async (req, res) => {
  const { isAdmin: newAdminStatus } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.isAdmin = newAdminStatus;
    await user.save();
    res.json({ message: `L'utilisateur est maintenant ${newAdminStatus ? 'admin' : 'utilisateur standard'}` });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des droits admin' });
  }
});

module.exports = router;
