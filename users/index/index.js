'use strict';

const {scanDb} = require('../../services/db');

module.exports.index = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    console.log('Item', Item);

    const results = await scanDb('usersTable');

    return {
      statusCode: 200,
      body: JSON.stringify(
        results,
      ),
    };
  } catch (err) {
    callback(err, null);
  }
}