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
    const prices = await getPrice('ETH');
    const currentPriceUsd = prices.Item.priceUsd;
    console.log(currentPriceUsd);
    
    const result = await scanTasksDb();
    if (result) {
      const tasks = result.Items || [];
      console.log(tasks);

      for(const task of tasks) {
        if (task.isActive){
          if (currentPriceUsd < task.triggerMeta.price) {
            const params = {
              toAddress: task.actionMeta.address,
              amt: task.actionMeta.amount,
              taskId: task.id,
              taskHistory: task.taskHistory || [],
            };
            await transferEther(params);
          } else {
            console.log(currentPriceUsd.priceUsd, task.triggerMeta.price)
          }
        } else {
          console.log(task.isActive)
        }
      }
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {message: 'success'}
      ),
    };

  }
  catch(e){
    console.error(e)
    callback(err, null);
  }
}


