'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sendo-dev'
  },

  seedDB: false,
  upload_files_path: ".tmp/development/uploads/"
};
