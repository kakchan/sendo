'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs.extra');
var async = require('async');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9876,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'sendo-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  upload_files_path: ".tmp/uploads/"
};

// Export the config object based on the NODE_ENV
// ==============================================
var config = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

// upload paths
config.product_photo_path = config.upload_files_path + '/photos/products';

var remove_folder = function(path, done) {
  fs.rmrf( path, function( err ) {
    done( err );
  } );
};

var create_folder = function(path, done) {
  fs.mkdirp(path, function (err) {
    if (err) {
      console.error(err);
      done( err );
      return;
    }
    console.log( path + " directory has been created");
    done( null );
  });
};

var recreate_file_path = function( path ) {
  async.waterfall( [
    remove_folder.bind( null, path ),
    create_folder.bind( null, path )
  ], function() {
    console.log("Completed: create_file_path")
  } );
};

if ( config.env === "test" ) {
  [ "product_photo_path" ].forEach( function(fn_name){
    recreate_file_path(config[fn_name]);
  } );
}

module.exports = config;
