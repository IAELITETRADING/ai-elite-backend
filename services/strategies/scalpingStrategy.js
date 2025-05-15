module.exports = {
  name: "Scalping Crypto",
  description: "Stratégie de très court terme sur cryptomonnaies",
  actifs: ["BTC", "ETH", "SOL", "XRP"],
  durée: "1 à 15 minutes",
  critères: [
    "Volume élevé sur les dernières 10 minutes",
    "Volatilité > 2%",
    "Breakout de résistance intrajournalière",
    "RSI < 30 ou > 70"
  ],
  gestionRisque: {
    stopLoss: "0.5%",
    takeProfit: "1%",
    levier: "1x à 5x max"
  },
  niveauRisque: "Élevé"
};
