'use strict';
require('dotenv').config()

const ethers = require('ethers');
const ENV = 'rinkeby'
const mock_keypairs = require("../../mocks/keypairs.json");
const MOCK_PUBKEYS = require('../../mocks/publicKeys.js')
const toAddress = '0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB'

const {
  scanTasksDb,
  getDb,
  scanDb,
  queryWithParamsDb,
} = require('../../Services/db');

const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'us-east-1'
});

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

function onScan(err, data){
  if (err) {
    console.error("Unable to scan the table. Error JSON:", err);
  }
  else {
    console.log('scan succeeded')
    data.Items.forEach(function(task) {
      console.log("Task~~~", task);
    })
  }
}
// getTasks();
async function getTasks() {

  const params = {
    TableName: 'tasksTable',
    FilterExpression: 'triggerId = :triggerId',
    ExpressionAttributeValues: {
      ':triggerId': 'eth-price-below'
    }
  }
  try {
    // let result = await ddb.scan(params, onScan);
    let result = await scanTasksDb();
    // console.log("result~~~", result)
  } catch (e) {
    console.log("scan didn't work", e)
  }
}
// getPrice()
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
    // let result = await ddb.get(params)
    console.log("Here1")
    let results = await getDb('pricesTable', {symbol: 'ETH'});
    return results;
  } catch (e) {
    console.log(e)
  }
};

module.exports.checkPrice = async (event, context, callback) => {
  try{
    console.log("Getting Price")
    let currentPriceUsd = await getPrice('ETH');
    let mockCurrentPriceUsd = 110;
    
    console.log("Getting Tasks")
    let tasks = await getTasks();

    tasks.forEach(task => {
      if( task.trigger.targetPriceUsd < mockCurrentPriceUsd ){
        console.log("task.forEach~~~")
        //trigger transfer lambda with 
        // task.userAddress, task.action.toAddress, task.action.address, task.action.privateKey
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
  catch(e){
    console.error(e)
  }
}


