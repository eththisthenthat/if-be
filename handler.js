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
  rp(requestOptions).then(response => {
    console.log('API call response:', response.data[symbol].quote.USD.price);
    return response.data[symbol].quote.USD.price;
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
}

async function writeDb(symbol, price) {
  const ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08'
  });

  let date = new Date();
  let timestamp = date.getTime();
  console.log(timestamp)

  var params = {
    TableName: 'pricesTable',
    Item: {
      'symbol': {  S: symbol },
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

module.exports.updatePrice = async (event, context, callback) => {
  try {
    let symbol = 'ETH'
    let ethPrice = await getPrice(symbol)
    await writeDb(symbol, ethPrice)
    // TO DO: Write To DB
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
    console.error('error updating price')
    // callback(err, null)
  }
};
