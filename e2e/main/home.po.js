'use strict';

var HomePage = function() {
  this.pageContainerEl = element(by.css('.page-container'));
/*
  this.h1El = this.heroEl.element(by.css('h1'));
  this.imgEl = this.heroEl.element(by.css('img'));
*/
};

module.exports = new HomePage();

