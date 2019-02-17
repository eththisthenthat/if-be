'use strict';

const {writeDb} = require('../../../services/db');

module.exports.create = async (event, context, callback) => {
  try {
    const Item = JSON.parse(event.body);
    Item.id = `${Item.triggerId}_${Item.actionId}_${Item.userAddress}`;

    await writeDb('triggersTable', Item);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Trigger created',
        Item,
      }),
    };
  } catch (err) {
    callback(err, null);
  }
}