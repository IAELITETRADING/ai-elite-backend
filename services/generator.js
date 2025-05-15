const { generateStrategy, evaluateStrategy } = require('./strategyService');
const Signal = require('../models/Signal');

exports.generateSignalForUser = async (user) => {
  const strategy = await generateStrategy(user.preferences);
  const scored = evaluateStrategy(strategy);

  const signal = await Signal.create({
    actif: strategy.nom || 'Signal IA',
    type: 'achat',
    score: scored.performanceScore,
    justification: strategy.description || 'Généré automatiquement',
    date: new Date(),
    userId: user._id
  });

  return signal;
};
