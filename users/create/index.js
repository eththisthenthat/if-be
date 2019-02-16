'use strict';

const {writeDb} = require('../../services/db');

module.exports.create = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    console.log('Item', Item);

    await writeDb('usersTable', Item);

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