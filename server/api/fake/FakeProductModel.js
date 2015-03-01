'use strict';

var FakeProductModel = function() {
};

FakeProductModel.find = function(query, callback) {
  callback( null, [] );
};

FakeProductModel.prototype.save = function( callback ) {
  callback();
};

module.exports = FakeProductModel;
