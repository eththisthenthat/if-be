'use strict';
require('dotenv').config()

const ethers = require('ethers');
const ENV = 'rinkeby'
const mock_keypairs = require("../mocks/keypairs.json");
const MOCK_PUBKEYS = require('../mocks/publicKeys.js')
const toAddress = '0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB'

const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});

/*
1. Price service retrieves latest Eth price from the dynamo table
1. Get all tasks where there's no previous history
3. Check all returned tasks for whether user's task.trigger.targetPrice is below the latest price
5. If it does, trigger transferAction lambda with user's public key, toAddress, and amount 
*/

/*
Example event
  {
      "ETH_NETWORK": "rinkeby",
      "PUB_KEY": "0x9Ea393d1bCe7D9fD3103d8Db75Fd9Cda90a8f740",
      "TO_ADDRESS": "0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB",
      "AMOUNT": ".1",
      "TARGET_PRICE": "120.11"
  }
*/

async function getTasks() {
  const ddb = new AWS.DynamoDB({
    apiVersion: '2012-10-08'
  });
  const params = {
    TableName: 'tasksTable',
    Key:{
      "name": 'low-price-trigger',
    }
  };

  try {
    let result = await ddb.get(params)
    console.log("result~~~", result)
  } catch (e) {
    console.log(e)
  }

}

async function getPrice(symbol)
  const ddb = new AWS.DynamboDb({
    apiVersion: '2012-10-08'
  });
  
  const params = {
    TableName: 'priceTable',
    Key:{
      "symbol": 'ETH',
    }
  };

  try {
    let result = await ddb.get(params)
    console.log("result~~~", result)
    return result;
  } catch (e) {
    console.log(e)
  }


}

module.exports = async (event, context, callback) => {
  try{
    let currentPriceUsd = await getPrice('ETH');
    let mockCurrentPriceUsd = 110;
    let tasks = await getTasks();

    tasks.forEach(task => {
      if(task.trigger.targetPriceUsd < mockCurrentPrice ){
        //trigger transfer lambda with 
        // task.userAddress, task.action.toAddress, task.action.amount, task.action.privateKey
      }
    }) 

    // check current price from price service table
    // get tasks from tasks table
    // get all task history
    // filter by tasks without price history 
    // filter by tasks containing price triggers 
    // if task.triggerJson.targetPrice < current price, call transferLambda


    // make comparison
    // if(Price[Currency].price < event.TARGET_PRICE){
        // trigger
    //}
    // if(returnedPrice){

  }
}


