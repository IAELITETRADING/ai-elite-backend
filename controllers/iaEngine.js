const Signal = require('../models/Signal');
const axios = require('axios');

async function genererSignalIA(actif, type, strategie = null) {
  const now = new Date();

  // === 1. Analyse de données fictives (à connecter à Polygon plus tard) ===
  const declencheurs = ['insider', 'hedge fund', 'politique', 'CEO', 'twitter'];
  const declencheur = declencheurs[Math.floor(Math.random() * declencheurs.length)];

  // === 2. Calcul du score IA ===
  let baseScore = 50;

  const scoreMap = {
    insider: 25,
    'hedge fund': 20,
    politique: 15,
    CEO: 10,
    twitter: 5
  };

  baseScore += scoreMap[declencheur];

  if (Math.random() > 0.8) baseScore += 5; // sentiment social positif
  if (Math.random() > 0.9) baseScore += 10; // convergence de signaux

  const score = Math.min(100, baseScore);

  // === 3. Définir TP / SL en fonction du type ===
  const prixEntree = 100 + Math.random() * 100;
  const takeProfit = prixEntree * (type === 'achat' ? 1.1 : 0.9);
  const stopLoss = prixEntree * (type === 'achat' ? 0.95 : 1.05);

  // === 4. Source info + sentiment social ===
  const sentiment = ['positif', 'neutre', 'négatif'][Math.floor(Math.random() * 3)];
  const actifsCorrélés = type === 'achat' ? ['SOXX', 'AMD', 'TSMC'] : ['QQQ', 'META'];

  const signal = new Signal({
    actif,
    type,
    strategie,
    prixEntree,
    takeProfit,
    stopLoss,
    score,
    sourceInfo: {
      declencheur,
      justification: `Détection IA de ${declencheur} sur ${actif} avec convergence de facteurs`,
      sentimentSocial: sentiment,
      chainesDeValeur: actifsCorrélés
    }
  });

  await signal.save();
  return signal;
}

module.exports = { genererSignalIA };
