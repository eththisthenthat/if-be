'use strict';

const dynamodb = require('../../infrastructure/dynamo');

module.exports.create = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    console.log('Item', Item);
    const params = {
      TableName: 'usersTable',
      Item,
    }

    try {
      await dynamodb.put(params).promise();
    } catch(e) {
      console.log('error', e);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created',
        Item,
      }),
    };
  } catch (err) {
    callback(err, null);
  }
}