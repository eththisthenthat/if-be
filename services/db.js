const dynamodb = require('../infrastructure/dynamo');

module.exports.writeDb = async (TableName, Item) => {
  const params = {
    TableName,
    Item,
  }
  try {
    await dynamodb.put(params).promise();
  } catch(e) {
    console.log('error', e);
  }
};

module.exports.indexDb = async TableName => {
  const params = {
    TableName,
  };
  try {
    await dynamodb.scan(params).promise();
  } catch(e) {
    console.log('err', e);
  }
}