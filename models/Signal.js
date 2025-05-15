const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema(
  {
    actif: { type: String, required: true },
    type: { type: String, enum: ['achat', 'vente'], required: true },
    score: { type: Number, default: 0 },
    justification: { type: String },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Signal', signalSchema);
