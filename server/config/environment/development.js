'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sendo-dev'
  },

  seedDB: true,
  upload_files_path: ".tmp/development/uploads/"
};
