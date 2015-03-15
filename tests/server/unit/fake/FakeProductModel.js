'use strict';

var FakeProductModel = function() {};

FakeProductModel._static_methods = ["find", "sort", "skip", "limit", "exec", "findById", "count"];
FakeProductModel._static_methods.forEach( function( method_name ) {
  FakeProductModel[method_name] = function( query, callback ) {
    callback();
  };
} );

FakeProductModel.prototype.save = function( callback ) {
  callback();
};

module.exports = FakeProductModel;
