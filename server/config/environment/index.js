'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs.extra');

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

  upload_files_path: ".tmp/uploads",
  log_files_path: ".tmp/logs",
  max_results_in_page: 20
};

// Export the config object based on the NODE_ENV
// ==============================================
var config = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

// upload paths
config.product_photo_path = config.upload_files_path + 'photos/products';

var remove_folder = function(path) {
  fs.rmrfSync( path );
};

var create_folder = function(path) {
  if ( fs.existsSync( path ) ) {
    return;
  }
  fs.mkdirpSync(path);
};

var recreate_file_path = function( path ) {
  remove_folder( path );
  create_folder( path );
};

if ( config.env === "test" ) {
  [ "product_photo_path", "log_files_path" ].forEach( function(fn_name){
    recreate_file_path(config[fn_name]);
  } );
} else {
  [ "product_photo_path", "log_files_path" ].forEach( function(fn_name){
    create_folder(config[fn_name]);
  } );
}


_.extend( config, {
  get_base_url: function() {
    return "http://" + config.host + ":" + config.port;
  },
  get_admin_base_url: function() {
    return this.get_base_url() + "/admin";
  },
  get_admin_login_api_url: function() {
    return this.get_admin_base_url() + "/auth/local";
  },
  get_admin_product_api_index_url: function() {
    return this.get_admin_base_url() + "/api/products";
  }
});

module.exports = config;
