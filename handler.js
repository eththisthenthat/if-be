'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const getPrice = async (symbol) => {
  assert(isValidCurrency(symbol), `Symbol "${symbol}" is not a supported currency!`)
  const requestOptions = {
    method: 'GET',
    uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_SECRET,
    },
    json: true,
    gzip: true
  };
  rp(requestOptions).then(response => {
    console.log('API call response:', response.data[symbol].quote.USD.price);
    return response.data[symbol].quote.USD.price;
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
};

module.exports.updatePrice = async (event, context, callback) => {
  try {
    const symbol = 'ETH';
    let ethPrice = getPrice(symbol)
    // TO DO: Write To DB
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `${symbol} price updated`,
        // input: event,
      }),
    };
  } catch (err) {
    console.error('error updating price')
    // callback(err, null)
  }
};
