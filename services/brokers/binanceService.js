const axios = require('axios');

exports.placeOrder = async (trade) => {
  try {
    // Exemple fictif — à adapter à Binance Spot API
    const res = await axios.post('https://api.binance.com/api/v3/order', {
      symbol: trade.actif,
      side: trade.type.toUpperCase(),
      quantity: trade.montant,
      type: 'MARKET'
    }, {
      headers: {
        'X-MBX-APIKEY': process.env.BINANCE_API_KEY
      },
      params: {
        timestamp: Date.now(),
        signature: 'SIGNATURE_GENERÉE' // doit être calculée via HMAC SHA256
      }
    });

    return res.data;
  } catch (err) {
    console.error('❌ Binance Error:', err.response?.data || err.message);
    throw new Error('Échec de l’ordre Binance');
  }
};
