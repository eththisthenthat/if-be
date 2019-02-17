
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
const CMC_API_SECRET = process.env.CMC_API_SECRET;
const rp = require('request-promise');
const { writeDb, scanDb } = require('../../services/db');


async function getPrice(symbol){
  const requestOptions = {
    method: 'GET',
    uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_SECRET,
    },
    json: true,
    gzip: true
  };
  const response = await rp(requestOptions);
  return response.data[symbol].quote.USD.price;
}

module.exports.updateEthPrice = async (event, context, callback) => {
  try {
    let symbol = 'ETH'
    let ethPrice = await getPrice(symbol)
    let date = new Date();
    let timestamp = date.getTime();
    console.log('new price', ethPrice);
    await writeDb('pricesTable', {
      symbol,
      'priceUsd': Number(ethPrice),
      'date': timestamp.toString(10),
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: `ETH price updated`,
      }),
    };
  } catch (err) {
    console.error('error updating price', err)
    callback(err, null)
  }
};

module.exports.getEthPrice = async (event, context, callback) => {
  try {
    const results = await scanDb('pricesTable');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        results,
      ),
    };
  } catch (err) {
    callback(err, null);
  }
};