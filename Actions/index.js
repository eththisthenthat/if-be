
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
  const result = await wallet.sendTransaction(tx)
}

module.exports.testInvoke = (event, context, callback) => {
  const params = {toAddress: '0x123', amt: 0.000008};

  return module.exports.transferEther(params);
}