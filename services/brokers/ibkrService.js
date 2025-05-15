// Cette version suppose que l’IBKR Gateway tourne en local ou via serveur bridge
const axios = require('axios');

exports.placeOrder = async (trade) => {
  try {
    const res = await axios.post(`${process.env.IBKR_GATEWAY_URL}/api/trade`, {
      symbol: trade.actif,
      action: trade.type.toUpperCase(), // BUY / SELL
      quantity: trade.montant,
      type: 'MKT'
    });

    return res.data;
  } catch (err) {
    console.error('❌ IBKR Error:', err.response?.data || err.message);
    throw new Error('Échec de l’ordre IBKR');
  }
};
