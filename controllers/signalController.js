const Signal = require('../models/Signal');

// Récupérer les signaux de l'utilisateur connecté
exports.getUserSignals = async (req, res, next) => {
  try {
    const signals = await Signal.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(signals);
  } catch (err) {
    next(err);
  }
};

// Télécharger les signaux passés (filtrés ou non)
exports.downloadSignals = async (req, res, next) => {
  try {
    const signals = await Signal.find({
      userId: req.user._id,
      date: { $lte: new Date() }
    }).sort({ date: -1 });

    const data = signals.map(s => ({
      actif: s.actif,
      type: s.type,
      score: s.score,
      justification: s.justification,
      date: s.date
    }));

    res.setHeader('Content-Disposition', 'attachment; filename=signals.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(
      'Actif,Type,Score,Justification,Date\n' +
      data.map(d => `${d.actif},${d.type},${d.score},"${d.justification}",${d.date.toISOString()}`).join('\n')
    );
  } catch (err) {
    next(err);
  }
};
