const dynamodb = require('../infrastructure/dynamo');

const buildUpdateData = data => {
  let UpdateExpression = 'set ';
  const ExpressionAttributeValues = {};

  for( const key in data) {
    const expressionKey = `:${key.charAt(0)}`;
    UpdateExpression += `${key} = ${expressionKey}, `;
    ExpressionAttributeValues[expressionKey] = data[key];
  }

  UpdateExpression = UpdateExpression.substring(0, UpdateExpression.length - 2);

  return {
    UpdateExpression,
    ExpressionAttributeValues,
  };
}

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

module.exports.scanDb = async TableName => {
  const params = {
    TableName,
  };
  try {
    return await dynamodb.scan(params).promise();
  } catch(e) {
    console.log('err', e);
  }
};

module.exports.getDb = async (TableName, Key)  => {
  const params = {
    TableName,
    Key,
  };
  try {
    return await dynamodb.get(params).promise();
  } catch(e) {
    console.log('err', e);
  }
};

module.exports.updateDb = async (TableName, Key, updateData)  => {
  const {
    UpdateExpression,
    ExpressionAttributeValues,
  } = buildUpdateData(updateData);

  const params = {
    TableName,
    Key,
    UpdateExpression,
    ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };
  try {
    return await dynamodb.update(params).promise();
  } catch(e) {
    console.log('err', e);
  }
};

module.exports.queryDb = async (TableName, address) => {
  const params = {
    TableName,
  };
  params.FilterExpression = "address = :address";
  params.ExpressionAttributeValues = {
      ":address": address,
  }
  try {
    return await dynamodb.scan(params).promise();
  } catch(e) {
    console.log('err', e);
  }
};
