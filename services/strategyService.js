exports.generateStrategy = (preferences) => {
  return {
    nom: 'Stratégie IA personnalisée',
    description: `Basée sur un profil ${preferences.riskLevel}, marchés : ${preferences.markets.join(', ')}`,
    conditions: ['insiders', 'volatilité', 'momentum'],
    actif: preferences.assets?.[0] || 'BTC',
    type: 'achat',
    score: Math.floor(Math.random() * 100)
  };
};

exports.evaluateStrategy = (strategy) => {
  return {
    ...strategy,
    performanceScore: strategy.score,
    precisionAttendue: Math.floor(strategy.score * 0.9)
  };
};
