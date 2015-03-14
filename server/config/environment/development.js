'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sendo-dev'
  },

  seedDB: false,
  files_root_path: ".tmp/development"
};
