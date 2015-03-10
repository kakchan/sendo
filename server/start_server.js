/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on("error", function(err, data){
  console.log( "ERROR: " + err.message );
});

var app = express();
var setup_server = function() {
  var server = require('http').createServer(app);
  require('./config/express')(app);
  require('./routes')(app);
  return server;
};

var start_server = function(server, done ) {
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    done && done();
  });
};

var setup_and_start_server = function( done ) {
  start_server(setup_server(), done );
};

var init = function( done ) {
  // Populate DB with sample data
  if(config.seedDB) {
    require('./config/seed')( setup_and_start_server.bind( null, done ) );
  } else {
    setup_and_start_server( done );
  }
};

// Expose app
module.exports = init;
