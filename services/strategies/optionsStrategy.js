module.exports = {
  name: "Options Covered Calls",
  description: "Stratégie d’options à revenu régulier",
  actifs: ["SPY", "QQQ", "AAPL", "TSLA"],
  durée: "1 à 4 semaines",
  critères: [
    "Possession de l’action sous-jacente",
    "Écriture d’un call légèrement OTM (+5%)",
    "Volatilité implicite modérée à haute",
    "Expiration dans les 15-30 jours"
  ],
  gestionRisque: {
    perteMax: "Perte de l’action si exercée",
    gainMax: "Prime de l’option + appréciation limitée",
    renouvellement: "Tous les mois"
  },
  niveauRisque: "Faible à modéré"
};
