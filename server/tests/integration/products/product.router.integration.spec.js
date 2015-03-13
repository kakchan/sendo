'use strict';
var request = require("request");
var config = require("../../../config/environment/index");
var should = require('should');
var utils = require("../../test_utils");
var test_process = require("../../test_process");
var sample_products = require("../../../sample_data/sample_products");

describe('Product Router - Integration Test', function () {
  before(function (done) {
    test_process.start(done);
  });

  beforeEach(function (done) {
    utils.get_admin_access_token(function (err, token) {
      should.not.exist(err);
      should.exist(token);
      done();
    });
  });
  describe("create endpoint", function () {
    describe( "Fail Scenarios", function() {
      it("should failed when no authentication header", function (done) {
        request({
          uri: config.get_admin_product_api_index_url()
        }, function (err, data) {
          data.body.should.equal("UnauthorizedError: No Authorization header was found");
          done();
        });
      });
    } );

    describe("Success Scenarios", function () {
      it( "should return correct values if no queries specified", function( done ) {
        utils.get_admin_products({}, function (err, resp, json) {
          var expected_products = sample_products;

          json.current_page.should.equal(1);
          json.total_pages.should.equal(Math.ceil(sample_products.length / config.max_results_in_page));
          json.products.length.should.equal(config.max_results_in_page);
          utils.partial_array_eql(json.products, expected_products);
          done();
        });
      } );

      it( 'should return correct values if "limit" set to one', function( done ) {
        utils.get_admin_products({ limit: 1 }, function (err, resp, json) {
          var expected_products = sample_products[0];
          json.current_page.should.equal(1);
          json.total_pages.should.equal(205);
          json.products.length.should.equal(1);
          utils.partial_array_eql(json.products, expected_products);
          done();
        } );
      } );

      it( 'should return correct values if "page" set to two', function( done ) {
        utils.get_admin_products({ limit: 1, page: 2 }, function (err, resp, json) {
          var expected_products = sample_products[1];
          json.current_page.should.equal(2);
          json.total_pages.should.equal(205);
          json.products.length.should.equal(1);
          utils.partial_array_eql(json.products, expected_products);
          done();
        } );
      } );
    });
  });
});
