'use strict';

const {
  scanTasksDb,
  getDb,
} = require('../../services/db');

const { transferEther } = require('../../Actions/index');

async function getPrice(){
  const params = {
    TableName: 'pricesTable',
    KeyConditionExpression: "#symbol = :symbol",
    ExpressionAttributeNames: {
      '#symbol': 'symbol'
    },
    ExpressionAttributeValues: {
      ":symbol": 'ETH'
    }
  };
  try {
    let results = await getDb('pricesTable', {symbol: 'ETH'});
    return results;
  } catch (e) {
    console.log(e)
  }
};

module.exports.checkPrice = async (event, context, callback) => {
  try{
    let currentPriceUsd = await getPrice('ETH');
    
    const result = await scanTasksDb();
    if (result) {
      const tasks = result.Items || [];

      for(const task of tasks) {
        if (currentPriceUsd.priceUsd < task.triggerMeta.price) {
          const params = {
            toAddress: task.actionMeta.address,
            amt: task.actionMeta.amount,
          };
          await transferEther(params);
        }
      }
    }
    return;

  }
  catch(e){
    console.error(e)
  }
}


