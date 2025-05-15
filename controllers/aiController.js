const { generateStrategy, evaluateStrategy } = require('../services/strategyService');
const strategies = require('../services/strategies');

// Générer une stratégie IA personnalisée (GPT)
exports.getAIDynamicStrategy = async (req, res, next) => {
  try {
    const userPrefs = req.user.preferences;
    const rawStrategy = await generateStrategy(userPrefs);
    const scored = evaluateStrategy(rawStrategy);
    res.status(200).json(scored);
  } catch (err) {
    next(err);
  }
};

// Renvoyer les stratégies expertes prédéfinies
exports.getExpertStrategies = (req, res) => {
  res.status(200).json({
    scalping: strategies.scalping,
    swing: strategies.swing,
    options: strategies.options
  });
};
