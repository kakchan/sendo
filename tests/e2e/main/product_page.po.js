'use strict';

var ProductPage = function() {
  this._page_el = element( by.css("html") );
  this._product_title_el = this._page_el.element(by.css('.product-title'));
  this._product_image_el = this._page_el.element(by.css('.product-thumbnail-image'));
};

ProductPage.prototype.visit = function() {
  var collection_page = require("./collection_page.po");
  collection_page.visit();

  var product_detail_el = collection_page._page_el.element(by.css("a[href='/products/product-001']"));
  product_detail_el.click();
};

module.exports = new ProductPage();

