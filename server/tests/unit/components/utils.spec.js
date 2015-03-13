'use strict';

var should = require('should');
var utils = require('../../../components/utils');

describe('Utils', function() {
  it('pad_zero should return correct value', function() {
    utils.pad_zero(0,2).should.equal( "00" );
    utils.pad_zero(1,2).should.equal( "01" );
    utils.pad_zero(1,3).should.equal( "001" );
  });
});
