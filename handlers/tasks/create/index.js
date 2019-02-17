'use strict';

const {writeDb} = require('../../../services/db');

module.exports.create = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    let date = new Date();
    let timestamp = date.getTime();
    Item.id = `${Item.triggerId}_${Item.actionId}_${Item.address}_${timestamp.toString(10)}`;

    await writeDb('tasksTable', Item);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Task created',
        Item,
      }),
    };
  } catch (err) {
    callback(err, null);
  }
}