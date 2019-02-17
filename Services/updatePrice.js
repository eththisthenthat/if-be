
const CMC_API_SECRET = process.env.CMC_API_SECRET;
const rp = require('request-promise');
const assert = require('assert');
const { isValidCurrency } = require('../assertUtils')

// Add {event, context, callback} later

/*
Example event
{
    "SYMBOL" : "0xe5B73Dd4308E12C69E365f78611Dfee806317eD",
  }
*/

module.exports.updatePrice = async (symbol) => {
  try {
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
}

async function getPrice(symbol){
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
}


