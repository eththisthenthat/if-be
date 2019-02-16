'use strict';
require('dotenv').config()

// const awsParamStore = require('aws-param-store');
const ethers = require('ethers');
const ENV = 'rinkeby'
const mock_keypairs = require("../mocks/keypairs.json");
const MOCK_PUBKEYS = require('../mocks/publicKeys.js')
const toAddress = '0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB'

/*
1. Get all user's public address and triggers where triggered = false
2. Check whether each user's target falls below a certain price
3. If so, trigger retireve the user's private key and trigger sendTransaction()
4. Return transaction receipt
*/


// module.exports = async (event, context, callback)=>{
//   try{

//   }
// }
/*
Example event
{
    "ETH_NETWORK": "rinkeby",
    "PUBK_ARRAY": ["0x9Ea393d1bCe7D9fD3103d8Db75Fd9Cda90a8f740", "0x9Ea393d1bCe7D9fD3103d8Db75Fd9Cda90a8f740"]
    "TO_ADDRESS": "0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB",
    "AMOUNT": ".1",
  }
*/

async function sendTransaction(){
  console.log("PUBKEYS", MOCK_PUBKEYS)
  let provider = ethers.getDefaultProvider(ENV);
  // const { PK_ARRAY } = getSecrets(MOCK_PUBKEYS);
  const privateKey = getPrivateKey(MOCK_PUBKEYS[0])
  let _amount = ethers.utils.parseEther('.1');
  
  console.log("_amount~~~", _amount)
  let wallet = new ethers.Wallet(privateKey, provider);
  let tx = {
    to: toAddress,
    value: _amount
  };
  await wallet.sendTransaction(tx)
}

async function getSecrets(pubKeys){
  //TO DO: Use AWS param store  
  let PK_ARRAY = [];
  try {
    PK_ARRAY = pubKeys.map( pubKey => {
      if(mock_keypairs[pubKey]){
        return mock_keypairs[pubKey]
      }
    })
  } catch (e) {
    console.log(e)
    throw Error('Cannot find any signing keypair')
  }
  console.log('New PK_KEY value ' + PK_KEY)
  return {
    PK_ARRAY,
  }

}
function getPrivateKey(pubKey){
  //TO DO: Use AWS param store  
  if(mock_keypairs[pubKey]){
    return mock_keypairs[pubKey]
  }
  return false;
}

