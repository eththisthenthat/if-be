
const ethers = require('ethers');
const ENV = 'rinkeby'

const address_from = process.env.ADDRESS_0;
const pKey_from = process.env.PRIVATE_0;

module.exports.transferEther = async params => {
  const { toAddress, amt } = params;
  let provider = ethers.getDefaultProvider(ENV);
  let _amount = ethers.utils.parseEther(amt.toString());
  
  let wallet = new ethers.Wallet(pKey_from, provider);
  let tx = {
    to: toAddress,
    value: _amount
  };
  console.log('starting transaction', tx);
  const result = await wallet.sendTransaction(tx);
  console.log('sent', result);
}