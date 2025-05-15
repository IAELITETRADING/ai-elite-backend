const axios = require('axios');

exports.placeOrder = async (trade) => {
  try {
    const res = await axios.post(
      `${process.env.OANDA_API_URL}/v3/accounts/${process.env.OANDA_ACCOUNT_ID}/orders`,
      {
        order: {
          instrument: trade.actif,
          units: trade.type === 'achat' ? trade.montant : -trade.montant,
          type: 'MARKET',
          timeInForce: 'FOK',
          positionFill: 'DEFAULT'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OANDA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;
  } catch (err) {
    console.error('❌ OANDA Error:', err.response?.data || err.message);
    throw new Error('Échec de l’ordre OANDA');
  }
};
