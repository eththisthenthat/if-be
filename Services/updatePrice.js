
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
const rp = require('request-promise');
const assert = require('assert');
const { isValidCurrency } = require('../assertUtils')

const CMC_API_SECRET = process.env.CMC_API_SECRET;


// Add {event, context, callback} later

/*
Example event
{
    "SYMBOL" : "0xe5B73Dd4308E12C69E365f78611Dfee806317eD",
  }
*/

module.exports.updatePrice = async (event, context, callback) => {
  try {
    let ethPrice = getPrice(event.symbol)
    // TO DO: Write To DB
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `${event.symbol} price updated`,
      }),
    };
  } catch (err) {
    console.error('error updating price')
    // callback(err, null)
  }
}
async function writedb(symbol, price) {
  const ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08'
  });

  let date = new Date();
  let timestamp = date.getTime();
  console.log(timestamp)

  var params = {
    TableName: 'CryptoPrices',
    Item: {
      'currency': {  S: symbol },
      'priceUsd': { N: Number(price) },
      'date': { N: timestamp.toString(10) }
    }
  };

  try {
    await ddb.putItem(params).promise()
  } catch (e) {
    console.log('error')
    console.log(e)
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
