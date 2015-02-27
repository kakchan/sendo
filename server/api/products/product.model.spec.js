'use strict';

var should = require('should');
var app = require('../../app');
var Product = require('./product.model');

var product = new Product({
  title: { en: "Product 1" },
  description: { en: "Product 1 Description" }
});

describe('Product Model', function() {
  before(function(done) {
    // Clear users before testing
    Product.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Product.remove().exec().then(function() {
      done();
    });
  });

  it('should fail when saving a duplicate product', function(done) {
    product.save(function() {
      var productDup = new Product(product);
      productDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without product title', function(done) {
    product.title = '';
    product.save(function(err) {
      should.exist(err);
      done();
    });
  });
});
