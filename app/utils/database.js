const mongoose = require('mongoose');
const bluebird = require('bluebird');

const config = require('../config');

const connect = () => {
  mongoose.Promise = bluebird;

  mongoose.connect(config.get('db:connection') + '/' + config.get('db:name'),
                   config.get('db:options'));

  mongoose.connection.on('open', () => {
    console.log('database connected on',
                config.get('db:connection') + '/' + config.get('db:name'));
  });
  mongoose.connection.on('error', () => {
    console.log('database connection error on',
                config.get('db:connection') + '/' + config.get('db:name'));
  });
};

module.exports = {
  connect,
};
