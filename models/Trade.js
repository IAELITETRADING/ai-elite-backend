const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    actif: { type: String, required: true },
    type: { type: String, enum: ['achat', 'vente'], required: true },
    montant: { type: Number, required: true },
    prix: { type: Number },
    date: { type: Date, default: Date.now },
    origine: { type: String, enum: ['auto', 'manuel'], default: 'manuel' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trade', tradeSchema);
