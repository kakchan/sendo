'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs-extra');

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
  host: process.env.HOST || "localhost",
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

  files_root_path: process.cwd() + "/.tmp",
  max_results_in_page: 20
};

// Export the config object based on the NODE_ENV
// ==============================================
var config = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

// TODO: this method need to be moved
var setup_file_directories = function() {
  // upload paths
  config.product_photo_uri = '/uploads/photos/products';
  config.product_photo_path = config.files_root_path + config.product_photo_uri;

  config.themes_path = config.files_root_path + "/themes";

  config.log_files_root_path = config.files_root_path + "/logs";

  var remove_folder = function(path) {
    fs.removeSync( path );
  };

  var create_folder = function(path) {
    fs.ensureDirSync( path );
  };

  var recreate_file_path = function( path ) {
    remove_folder( path );
    create_folder( path );
  };

  var file_path_names = ["product_photo_path", "log_files_root_path", "themes_path"];
  if ( config.env === "test" ) {
    file_path_names.forEach( function(fn_name){
      recreate_file_path(config[fn_name]);
    } );
  } else {
    file_path_names.forEach( function(fn_name){
      create_folder(config[fn_name]);
    } );
  }

  // copy default theme to environment folder
  fs.copySync("./themes", config.themes_path);

  // copy dummy images
  fs.copySync("./tests/test_files/products", config.product_photo_path);
};

var add_api_urls_to_config = function() {
  _.extend( config, {
    get_base_url: function() {
      return "http://" + config.host + ":" + config.port;
    },
    get_admin_base_url: function() {
      return this.get_base_url() + "/admin";
    },

    /* Login */
    get_admin_login_api_url: function() {
      return this.get_admin_base_url() + "/auth/local";
    },

    /* Products */
    get_admin_product_api_index_url: function() {
      return this.get_admin_base_url() + "/api/products";
    },

    /* Themes */
    get_admin_theme_api_index_url: function() {
      return this.get_admin_base_url() + "/api/themes";
    }
  });
};

var init = function() {
  setup_file_directories();
  add_api_urls_to_config();
};

init();
module.exports = config;
