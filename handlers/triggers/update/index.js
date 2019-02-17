'use strict';

const {updateDb} = require('../../../services/db');

module.exports.update = async (event, context, callback) => {
  try {
    const { id } = event.pathParameters;
    const updateData = JSON.parse(event.body);
    const key = {
      "id": id,
    };

    const results = await updateDb(
      'triggersTable', 
      key,
      updateData,
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