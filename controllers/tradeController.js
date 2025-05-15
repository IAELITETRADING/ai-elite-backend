const Trade = require('../models/Trade');

// Récupérer les trades de l'utilisateur connecté
exports.getUserTrades = async (req, res, next) => {
  try {
    const trades = await Trade.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(trades);
  } catch (err) {
    next(err);
  }
};

// Enregistrer un trade manuel
exports.addManualTrade = async (req, res, next) => {
  try {
    const { actif, type, montant, prix, date } = req.body;

    const newTrade = await Trade.create({
      userId: req.user._id,
      actif,
      type,
      montant,
      prix,
      date: date || new Date(),
      origine: 'manuel'
    });

    res.status(201).json(newTrade);
  } catch (err) {
    next(err);
  }
};
