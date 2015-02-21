/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@laputan.me',
    password: 'password'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@laputan.me',
    password: 'password'
  }, function() {
      console.log('finished populating users');
    }
  );
});
