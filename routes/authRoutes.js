const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simulation base de données
const users = [];

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis' });

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

  const newUser = { id: Date.now(), email, password };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id }, 'secret123');
  res.json({ token });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const token = jwt.sign({ id: user.id }, 'secret123');
  res.json({ token });
});

module.exports = router;
