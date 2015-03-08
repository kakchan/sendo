'use strict';
var request = require("request");
var config = require("../../../config/environment/index");
var should = require('should');
var utils = require("../../utils");
var test_process = require("../../test_process");

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
          var expected_products = [
            {
              "title": "Product 2",
              "description": "Product Description 2",
              "page_title": "Product Page Title 2",
              "meta_description": "Product Meta Description 2",
              "images": []
            }, {
              "title": "Product 1",
              "description": "Product Description 1",
              "page_title": "Product Page Title 1",
              "meta_description": "Product Meta Description 1",
              "images": []
            }
          ];
          json.current_page.should.equal(1);
          json.total_pages.should.equal(1);
          json.products.length.should.equal(2);
          utils.partial_array_eql(json.products, expected_products);
          done();
        });
      } );

      it( 'should return correct values if "limit" set to one', function( done ) {
        utils.get_admin_products({ limit: 1 }, function (err, resp, json) {
          var expected_products = [
            {
              "title": "Product 2",
              "description": "Product Description 2",
              "page_title": "Product Page Title 2",
              "meta_description": "Product Meta Description 2",
              "images": []
            }
          ];
          json.current_page.should.equal(1);
          json.total_pages.should.equal(2);
          json.products.length.should.equal(1);
          utils.partial_array_eql(json.products, expected_products);
          done();
        } );
      } );

      it( 'should return correct values if "page" set to two', function( done ) {
        utils.get_admin_products({ limit: 1, page: 2 }, function (err, resp, json) {
          var expected_products = [
            {
              "title": "Product 1",
              "description": "Product Description 1",
              "page_title": "Product Page Title 1",
              "meta_description": "Product Meta Description 1",
              "images": []
            }
          ];
          json.current_page.should.equal(2);
          json.total_pages.should.equal(2);
          json.products.length.should.equal(1);
          utils.partial_array_eql(json.products, expected_products);
          done();
        } );
      } );
    });
  });
});
