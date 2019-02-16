'use strict';

const {updateDb} = require('../../services/db');

module.exports.update = async (event, context, callback) => {
  try {
    const { ethAddress } = event.pathParameters;
    const updateData = JSON.parse(event.body);
    const key = {
      "address": ethAddress,
    };    

    const results = await updateDb(
      'usersTable', 
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