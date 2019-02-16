const isValidCurrency = symbol => {
  const supportedCurrencySymbols = ['ETH', 'DAI']
  if (typeof symbol !== 'string') {
    return false;
  }
  return supportedCurrencySymbols.includes(symbol)
};

module.exports = {
  isValidCurrency
};