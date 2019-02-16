'use strict';

const {updateDb} = require('../../services/db');

module.exports.update = async (event, context, callback) => {
  try {
    const { ethAddress } = event.pathParameters;
    const updateData = JSON.parse(event.body);
    const key = {
      "address": ethAddress,
    };

    let updateExpression = 'set ';
    const expressionValues = {};

    for( const key in updateData) {
      const expressionKey = `:${key.charAt(0)}`;
      updateExpression += `${key} = ${expressionKey}, `;
      expressionValues[expressionKey] = updateData[key];
    }

    updateExpression = updateExpression.substring(0, updateExpression.length - 2);

    const results = await updateDb(
      'usersTable', 
      key,
      updateExpression,
      expressionValues,
    );

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