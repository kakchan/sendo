/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/products/product.model');

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
  });
});

Product.find({}).remove( function() {
  Product.create({
    title: "Product 1",
    description: "Product Description 1",
    page_title: "Product Page Title 1",
    meta_description:"Product Meta Description 1"
  }, {
    title: "Product 2",
    description: "Product Description 2",
    page_title: "Product Page Title 2",
    meta_description:"Product Meta Description 2"
  }, function() {
    console.log('finished populating products');
  });
});
