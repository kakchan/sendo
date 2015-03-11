/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var log = require("../components/log");

var async = require('async');
var User = require('../admin/api/user/user.model');
var Product = require('../admin/api/products/product.model');
var sample_products = require("../sample_data/sample_products");

var create_users = function( done ) {
  User.find({}).remove(function () {
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
    }, function ( err ) {
      log.info('finished populating users');
      done( err );
    });
  });
};

var create_products = function( done ) {
  Product.find({}).remove(function () {
    async.eachSeries(sample_products, function create_product( product, create_product_done ) {
      Product.create( product, create_product_done );
    }, function( err ) {
      log.info('finished populating products');
      done( err );
    } );
  });
};

var init = function( done ) {
  async.waterfall( [
    create_users,
    create_products
  ], function( err ) {
    log.info('finished populating all seed data');
    done( err );
  } );
};

module.exports = init;
