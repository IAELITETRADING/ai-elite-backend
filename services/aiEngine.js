const { generateStrategy, evaluateStrategy } = require('./strategyService');
const { logCron } = require('../utils/cronLogger');

exports.runForUser = async (user) => {
  try {
    const raw = await generateStrategy(user.preferences);
    const evaluated = evaluateStrategy(raw);
    logCron(`✅ IA exécutée pour ${user.email}`);
    return evaluated;
  } catch (err) {
    logCron(`❌ Erreur IA ${user.email}: ${err.message}`);
    throw err;
  }
};
