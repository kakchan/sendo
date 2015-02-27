'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // Server port
  port: process.env.PORT || 9877,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sendo-test'
  },

  seedDB: true
};
