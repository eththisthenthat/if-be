'use strict';

const {updateDb} = require('../../services/db');

module.exports.update = async (event, context, callback) => {
  try {
    console.log(event);
    const Item = JSON.parse(event.body);
    console.log('Item', Item);

    const results = await updateDb(
      'usersTable', 
      {
        "address": Item.address,
      },
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