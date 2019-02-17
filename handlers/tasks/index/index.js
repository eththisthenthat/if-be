'use strict';

const {
  scanDb,
  queryDb,
} = require('../../../services/db');

module.exports.index = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);

    const results = await scanDb('tasksTable');

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

module.exports.indexByUser = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    const { address } = event.pathParameters;

    const results = await queryDb('tasksTable', address);

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