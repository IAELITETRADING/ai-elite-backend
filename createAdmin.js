// backend/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('Motdepasse123', 10);

  const admin = new User({
    email: 'admin@iaelitetrading.com',
    password: hashedPassword,
    role: 'admin',
    preferences: {
      riskLevel: 'high',
      markets: ['crypto', 'actions'],
      assets: ['BTC', 'AAPL'],
      autoTradeEnabled: true
    }
  });

  await admin.save();
  console.log('✅ Utilisateur admin créé avec succès');
  process.exit();
};

createAdmin().catch((err) => {
  console.error('❌ Erreur lors de la création de l’admin :', err);
  process.exit(1);
});
