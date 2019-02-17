'use strict';

const {getDb} = require('../../../services/db');

module.exports.get = async (event, context, callback) => {
  try {
    const { ethAddress } = event.pathParameters;

    const results = await getDb('usersTable', {"address": ethAddress});

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