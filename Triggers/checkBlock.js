'use strict';
require('dotenv').config()

const ethers = require('ethers');
const ENV = 'rinkeby'
const lastRecordedBlock = 1
/*
Event
  {
    lastRecorderBlock: 100000000,
  }
*/
async function checkBlockNumber(){
  let provider = ethers.getDefaultProvider(ENV);
  let lastBlockNumber = await provider.getBlockNumber();
  console.log("Last Block Number", lastBlockNumber);
  if(lastBlockNumber > lastRecordedBlock +10){
    //trigger action: sms send  lambda
    console.log("~~Triggering SMS send~~")
  }
}
// Testing
// checkBlockNumber();

module.exports = async (event, context) => {
  let provider = ethers.getDefaultProvider(ENV);
  if(provider.blockNumber > lastBlockNumber +10){
    //trigger action: sms send  lambda
  }
}

