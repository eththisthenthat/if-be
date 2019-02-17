
const ethers = require('ethers');
const ENV = 'rinkeby'

const address_from = process.env.ADDRESS_0;
const pKey_from = process.env.PRIVATE_0;

const {
  updateDb,
} = require('../services/db');

module.exports.transferEther = async params => {
  const { toAddress, amt, taskId, taskHistory } = params;
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
  const key = {
    'id': taskId,
  };
  let date = new Date();
  let timestamp = date.getTime();
  const newHistory ={
    startTime: timestamp.toString(10),
    txHash: result.hash,
    status: 'success',
  }
  taskHistory.push(newHistory);
  const updateData = {
    taskHistory,
  }
  const update = await updateDb('tasksTable', key, updateData);
  console.log(update);
}