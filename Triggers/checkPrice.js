'use strict';
require('dotenv').config()

const ethers = require('ethers');
const ENV = 'rinkeby'
const mock_keypairs = require("../mocks/keypairs.json");
const MOCK_PUBKEYS = require('../mocks/publicKeys.js')
const toAddress = '0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB'

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

module.exports = async (event, context, callback) => {
  try{
    // check prices table
    // make comparison
    // if(Price[Currency].price < event.TARGET_PRICE){
        // trigger
    //}
    // if(returnedPrice){

    }
}


