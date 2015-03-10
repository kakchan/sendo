'use strict';

var should = require('should');
var rewire = require('rewire');
var ProductRouter = rewire("../../../admin/api/products/product.router");
var FakeAsync = require('../fake/FakeAsync');
var FakeProductModel = require('../fake/FakeProductModel');
var FakeFileSystem = require('../fake/FakeFileSystem');
var sinon = require('sinon');
var config = require("../../../config/environment");

describe('Product Router', function() {
  beforeEach(function(done) {
    // Product Model
    FakeProductModel = sinon.spy(FakeProductModel);
    FakeProductModel.prototype.save = sinon.stub(FakeProductModel.prototype, "save");
    FakeProductModel.findById = sinon.stub(FakeProductModel, "findById");
    FakeAsync.auto = sinon.stub(FakeAsync, "auto");

    ProductRouter.__set__( {
      "Product": FakeProductModel,
      "async": FakeAsync
    } );

    // File System
    FakeFileSystem = sinon.spy(FakeFileSystem);
    FakeFileSystem.unlink = sinon.stub(FakeFileSystem, "unlink");
    ProductRouter.__set__( "fs", FakeFileSystem );

    done();
  });

  afterEach(function(done) {
    // Product Model
    FakeProductModel.reset();
    FakeProductModel.prototype.save.restore();
    FakeProductModel.findById.restore();
    FakeAsync.auto.restore();

    // File System
    FakeFileSystem.reset();
    FakeFileSystem.unlink.restore();
    done();
  });

  describe( "index endpoint", function() {
    // Index
    it('should return the results and 200 http status if it is successful', function(done) {
      // Given
      var res = { send: sinon.spy(), json: sinon.spy() };
      var products = [{name: "Product 1"}];
      FakeAsync.auto.yields(null, {
        product_count: 1,
        products: products
      });

      // When
      ProductRouter.index({}, res);

      // Then
      res.json.calledWith(200, {
        current_page: 1,
        total_pages: 1,
        products: products
      } ).should.equal(true);

      res.send.called.should.equal(false);
      done();
    });

    it('should return 500 http status if there is any errors', function(done) {
      // Given
      var res = { send: sinon.spy(), json: sinon.spy() };
      FakeAsync.auto.yields(true, null);

      // When
      ProductRouter.index({}, res);

      // Then
      res.json.called.should.equal(false);
      res.send.calledWith(500).should.equal(true);
      done();
    });
  } );

  describe( "get endpoint", function() {
    // Get
    it('should get specific product with success response', function( done ) {
      // Given
      var req = { params: { id: "product_1" } };
      var res = { send: sinon.spy(), json: sinon.spy() };
      var product = {
        id: "product_1",
        title: "Product 1",
        description: "Product 1 Description",
        page_title: "Product 1 Page Title",
        meta_description: "Product 1 Meta Description"
      };
      FakeProductModel.findById.yields(null, product );

      // When
      ProductRouter.get( req, res );

      // Then
      res.json.calledWith(200, product).should.equal(true);
      res.send.called.should.equal(false);

      done();
    });

    it('should fail if product id not found', function( done ) {
      // Given
      var req = { params: { id: "product_1" } };
      var res = { send: sinon.spy(), json: sinon.spy() };
      FakeProductModel.findById.yields("Product Not Found");

      // When
      ProductRouter.get( req, res );

      // Then
      res.json.called.should.equal(false);
      res.send.calledWith(500,"Product Not Found").should.equal(true);

      done();
    });

    it('should fail if product id is not provided', function( done ) {
      // Given
      var req = { params: {} };
      var res = { send: sinon.spy(), json: sinon.spy() };

      // When
      ProductRouter.get( req, res );

      // Then
      res.json.called.should.equal(false);
      res.send.calledWith(500,"'id' is required").should.equal(true);

      done();
    });
  });

  describe( "create endpoint", function() {
    // Create
    it('should create new Product with success response', function( done ) {
      // Given
      var res = { send: sinon.spy(), json: sinon.spy() };
      var result = { name: "Product 1" };
      FakeProductModel.prototype.save.yields(null, result);

      // When
      ProductRouter.create({}, res);

      // Then
      FakeProductModel.calledWithNew().should.equal(true);
      res.json.calledWith(200, result).should.equal(true);
      res.send.called.should.equal(false);

      done();
    });

    it('should return 500 http status with error message', function( done ) {
      // Given
      var res = { send: sinon.spy(), json: sinon.spy() };
      var result = { name: "Product 1" };
      var error_message = "Error Message";
      var error_response = { errors: { title: { message: error_message } } };
      FakeProductModel.prototype.save.yields(error_response, result);

      // When
      ProductRouter.create({}, res);

      // Then
      FakeProductModel.calledWithNew().should.equal(true);
      res.json.called.should.equal(false);
      res.send.calledWith(500, [ error_message ]).should.equal(true);

      done();
    });
  } );

  describe( "upload_photo endpoint", function() {
    it('should return uploaded file path', function( done ) {
      // Given
      var files = [
        { name: "Photo 1", size: 1234 },
        { name: "Photo 2", size: 5678 }
      ];
      var result = {
        files: [
          { filename: "Photo 1", size: 1234 },
          { filename: "Photo 2", size: 5678 }
        ]
      };
      var req = { files: files };
      var res = { send: sinon.spy(), json: sinon.spy() };

      // When
      ProductRouter.upload_photo( req, res );

      // Then
      res.send.called.should.equal( false );
      res.json.calledWithExactly( result ).should.equal(true);

      done();
    });

    it('should return 500 http status if no "files" provided', function( done ) {
      // Given
      var req = {};
      var res = { send: sinon.spy(), json: sinon.spy() };

      // When
      ProductRouter.upload_photo( req, res );

      // Then
      res.json.called.should.equal( false );
      res.send.calledWith( 500 ).should.equal(true);

      done();
    });
  } );

  describe( "delete_photo endpoint", function() {
    // delete_photo
    it('should return 500 http status if no filename in the query string', function( done ) {
      // Given
      var req = { query: {} };
      var res = { send: sinon.spy(), json: sinon.spy() };

      // When
      ProductRouter.delete_photo( req, res );

      // Then
      res.json.called.should.equal( false );
      res.send.calledWith( 500 ).should.equal(true);

      done();
    });

    it('should return 500 http status if filename does not exist', function( done ) {
      // Given
      var req = { query: { filename: "abc134" } };
      var res = { send: sinon.spy(), json: sinon.spy() };
      FakeFileSystem.unlink.yields("No file found");

      // When
      ProductRouter.delete_photo( req, res );

      // Then
      res.json.called.should.equal( false );
      res.send.calledWith( 500, "No file found" ).should.equal(true);

      done();
    });

    it('should return 200 http status if filename exists', function( done ) {
      // Given
      var req = { query: { filename: "abc134" } };
      var res = { send: sinon.spy(), json: sinon.spy() };
      FakeFileSystem.unlink.yields(null);

      // When
      ProductRouter.delete_photo( req, res );

      // Then
      res.json.calledWith(200).should.equal( true );
      res.send.called.should.equal(false);

      done();
    });
  } );
});
