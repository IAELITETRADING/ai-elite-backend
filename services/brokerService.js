exports.executeTrade = async (trade, broker) => {
  switch (broker) {
    case 'binance':
      return await require('./brokers/binanceService').placeOrder(trade);
    case 'oanda':
      return await require('./brokers/oandaService').placeOrder(trade);
    case 'ibkr':
      return await require('./brokers/ibkrService').placeOrder(trade);
    default:
      throw new Error(`Broker inconnu : ${broker}`);
  }
};
