const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Test
app.get('/', (req, res) => {
  res.send('API AI Elite Trading opérationnelle ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur le port ${PORT}`);
});
