'use strict';

var should = require('should');
var Product = require('./../../../api/products/product.model.js');
var async = require('async');

describe('Product Model', function() {
  beforeEach(function(done) {
    // Clear Products before testing
    Product.remove().exec().then(function() {
      this.product_1 = new Product({
        title: "Product 1",
        description: "Product 1 Description"
      });
      done();
    }.bind( this ));
  });

  afterEach(function(done) {
    Product.remove().exec().then(function() {
      done();
    });
  });

  it('should fail when saving a duplicate product', function(done) {
    this.product_1.save(function() {
      var productDup = new Product(this.product_1);
      productDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  describe( "Invalid Title", function() {
    it('should fail if product title is undefined', function(done) {
      var new_product = new Product();
      new_product.save(function(err) {
        should.exist(err);
        err.errors.title.message.should.equal( "'Title' field cannot be blank" );
        done();
      });
    });

    it('should fail if product title is blank', function( done ) {
      var new_product = new Product({ title: ""});
      new_product.save(function(err) {
        should.exist(err);
        err.errors.title.message.should.equal( "'Title' field cannot be blank" );
        done();
      });
    });
  });
});
