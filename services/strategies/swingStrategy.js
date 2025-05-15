module.exports = {
  name: "Swing Actions Tech",
  description: "Stratégie moyenne durée sur actions technologiques",
  actifs: ["AAPL", "NVDA", "META", "TSLA", "MSFT"],
  durée: "4 à 15 jours",
  critères: [
    "Tendance haussière sur 30 jours",
    "Croisement MACD haussier",
    "Volume au-dessus de la moyenne",
    "Momentum stable ou croissant"
  ],
  gestionRisque: {
    stopLoss: "4%",
    takeProfit: "10%",
    taillePosition: "5 à 10% du portefeuille"
  },
  niveauRisque: "Modéré"
};
