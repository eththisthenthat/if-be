'use strict';

const {writeDb} = require('../../../services/db');
const seeds = require('../../../seeds/actions.json');

module.exports.seed = async (event, context, callback) => {
  try {
    console.log(seeds);
    for( const seed of seeds) {
      await writeDb('actionsTable', seed);
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Actions Seeded'
    };
  } catch (err) {
    callback(err, null);
  }
}