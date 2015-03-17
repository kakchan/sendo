'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sendo-dev'
  },

  seedDB: true,
  files_root_path: process.cwd() + "/.tmp/development"
};
