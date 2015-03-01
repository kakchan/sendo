'use strict';

var should = require('should');
var rewire = require('rewire');
var ProductRouter = rewire("./product.router");
var FakeProductModel = require('../fake/FakeProductModel');
var sinon = require('sinon');

describe('Product Router', function() {
  beforeEach(function(done) {
    FakeProductModel = sinon.spy(FakeProductModel);
    FakeProductModel.prototype.save = sinon.stub(FakeProductModel.prototype, "save");
    FakeProductModel.find = sinon.stub(FakeProductModel, "find");
    ProductRouter.__set__( "Product", FakeProductModel );
    done();
  });

  afterEach(function(done) {
    FakeProductModel.reset();
    FakeProductModel.prototype.save.restore();
    FakeProductModel.find.restore();
    done();
  });

  // Index
  it('Index - should return the results and 200 http status if it is successful', function(done) {
    // Given
    var res = { send: sinon.spy(), json: sinon.spy() };
    var results = [{product: "Product 1"}];
    FakeProductModel.find.yields(null, results );

    // When
    ProductRouter.index({}, res);

    // Then
    res.json.calledWith(200, results).should.equal(true);
    res.send.called.should.equal(false);
    FakeProductModel.find.calledOnce.should.equal(true);
    done();
  });

  it('Index - should return 500 http status if there is any errors', function(done) {
    // Given
    var res = { send: sinon.spy(), json: sinon.spy() };
    FakeProductModel.find.yields( true );

    // When
    ProductRouter.index({}, res);

    // Then
    res.json.called.should.equal(false);
    res.send.calledWith(500).should.equal(true);
    FakeProductModel.find.calledOnce.should.equal(true);
    done();
  });

  // Create
  it('Create - should create new Product with successful response', function( done ) {
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

  it('Create - should return 500 http status with error message', function( done ) {
    // Given
    var res = { send: sinon.spy(), json: sinon.spy() };
    var result = { name: "Product 1" };
    var error_message = "Error Message";
    FakeProductModel.prototype.save.yields(error_message, result);

    // When
    ProductRouter.create({}, res);

    // Then
    FakeProductModel.calledWithNew().should.equal(true);
    res.json.called.should.equal(false);
    res.send.calledWith(500, error_message).should.equal(true);

    done();
  });
});
