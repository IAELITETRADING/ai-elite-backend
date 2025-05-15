import React from 'react';
import './SignalCard.css';

const SignalCard = ({ signal }) => {
  const {
    actif,
    type,
    strategie,
    prixEntree,
    stopLoss,
    takeProfit,
    score,
    sourceInfo,
    autoAdjusted,
    statut
  } = signal;

  const couleurScore = score >= 80 ? 'green' : score >= 60 ? 'orange' : 'red';
  const badgeCouleur = type === 'achat' ? 'badge-buy' : 'badge-sell';

  return (
    <div className="signal-card">
      <div className="signal-header">
        <h3>{actif}</h3>
        <span className={`badge ${badgeCouleur}`}>{type.toUpperCase()}</span>
      </div>

      <div className="signal-body">
        {strategie && <p><strong>Stratégie IA :</strong> {strategie}</p>}
        <p><strong>Prix d’entrée :</strong> {prixEntree.toFixed(2)} €</p>
        <p><strong>Stop-Loss :</strong> {stopLoss.toFixed(2)} €</p>
        <p><strong>Take-Profit :</strong> {takeProfit.toFixed(2)} €</p>

        <p><strong>Score IA :</strong>
          <span className={`score ${couleurScore}`}> {score} / 100</span>
        </p>

        <p><strong>Déclencheur IA :</strong> {sourceInfo?.declencheur}</p>
        {sourceInfo?.sentimentSocial && (
          <p><strong>Sentiment Social :</strong> {sourceInfo.sentimentSocial}</p>
        )}

        {sourceInfo?.justification && (
          <p className="justification">
            <em>{sourceInfo.justification}</em>
          </p>
        )}

        {autoAdjusted && (
          <p className="auto-adjusted">Ce signal a été ajusté automatiquement par l’IA</p>
        )}

        {sourceInfo?.chainesDeValeur?.length > 0 && (
          <p><strong>Actifs liés :</strong> {sourceInfo.chainesDeValeur.join(', ')}</p>
        )}

        <div className="signal-footer">
          <p className="accroche">
            Cette alerte IA est issue de plus de 50 signaux croisés : insiders, hedge funds, politique, sentiment social, chaînes de valeur...  
            <strong> Maximisez vos chances, agissez avant les autres.</strong>
          </p>
        </div>
      </div>

      {statut === 'fermé' && (
        <div className="signal-status">Signal clôturé</div>
      )}
    </div>
  );
};

export default SignalCard;
