'use strict';

const {writeDb} = require('../../../services/db');

module.exports.create = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);

    await writeDb('usersTable', Item);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'User created',
        Item,
      }),
    };
  } catch (err) {
    callback(err, null);
  }
}