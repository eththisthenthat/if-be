'use strict';

const AWS = require('aws-sdk');

let options = {};

if(process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  }
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
