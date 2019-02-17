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
      body: JSON.stringify(
        results,
      ),
    };
  } catch (err) {
    callback(err, null);
  }
}