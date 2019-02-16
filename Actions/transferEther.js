
const ethers = require('ethers');
const ENV = 'rinkeby'
const mock_keypairs = require("../mocks/keypairs.json");
const MOCK_PUBKEYS = require('../mocks/publicKeys.js')
const toAddress = '0x1425b7581Ccc63d5e9aA5D186047a40b14e6f3DB'

function getPrivateKey(pubKey){
  //TO DO: Use AWS param store  
  if(mock_keypairs[pubKey]){
    return mock_keypairs[pubKey]
  }
  return false;
}

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
  return PK_ARRAY
}

sendTransaction();