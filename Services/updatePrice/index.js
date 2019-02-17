
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});
const CMC_API_SECRET = process.env.CMC_API_SECRET;
const rp = require('request-promise');
const { writeDb, scanDb } = require('../../services/db');

async function getPrice(){
  const requestOptions = {
    method: 'GET',
    uri: 'https://api.coincap.io/v2/assets/ethereum',
    json: true,
  }
  const response = await rp(requestOptions);
  if(response.data){
    console.log("getPrice~~~", response.data.priceUsd)
    return response.data.priceUsd;
  }
  return '120'
}

module.exports.updateEthPrice = async (event, context, callback) => {
  try {
    let ethPrice = await getPrice()
    let date = new Date();
    let timestamp = date.getTime();
    await writeDb('pricesTable', {
      'symbol': 'ETH',
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