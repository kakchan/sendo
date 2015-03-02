'use strict';

var FakeProductModel = function() {
};

FakeProductModel.unlink = function(callback) {
  callback();
};

module.exports = FakeProductModel;
