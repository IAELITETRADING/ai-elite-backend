const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Générer un token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Inscription
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

// Connexion
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

// Données utilisateur
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Mise à jour des préférences
exports.updatePreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.preferences = req.body;
    await user.save();
    res.status(200).json(user.preferences);
  } catch (err) {
    next(err);
  }
};
