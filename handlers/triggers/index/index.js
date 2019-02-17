'use strict';

const {scanDb} = require('../../../services/db');

module.exports.index = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);

    const results = await scanDb('triggersTable');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        results,
      ),
    };
  } catch (err) {
    callback(err, null);
  }
}