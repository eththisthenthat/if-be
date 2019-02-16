'use strict';

const {getDb} = require('../../../services/db');

module.exports.get = async (event, context, callback) => {
  try {
    const { ethAddress } = event.pathParameters;

    const results = await getDb('usersTable', {"address": ethAddress});

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