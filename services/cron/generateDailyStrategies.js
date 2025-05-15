const User = require('../../models/User');
const Signal = require('../../models/Signal');
const { generateStrategy, evaluateStrategy } = require('../strategyService');
const { logCron } = require('../../utils/cronLogger');

exports.runAutoStrategyGeneration = async () => {
  try {
    const users = await User.find({ 'preferences.autoTradeEnabled': true });

    for (const user of users) {
      const rawStrategy = await generateStrategy(user.preferences);
      const strategy = evaluateStrategy(rawStrategy);

      await Signal.create({
        actif: strategy.nom || 'Stratégie IA',
        type: 'achat',
        score: strategy.performanceScore || 80,
        justification: strategy.description || 'Stratégie IA auto générée',
        date: new Date(),
        userId: user._id
      });

      logCron(`✅ Stratégie IA générée pour ${user.email}`);
    }

    logCron(`✅ CRON terminé : ${users.length} utilisateurs auto-trade traités`);
  } catch (err) {
    console.error('❌ Erreur CRON stratégie IA :', err);
    logCron(`❌ Erreur lors de la génération IA : ${err.message}`);
  }
};
