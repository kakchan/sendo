'use strict';

var AdminProductsPage = function() {
  this.pageContainerEl = element(by.css('.page-container'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  this.addProductButtonEl = this.pageContainerEl.element(by.css('.btn-add-product'));
  this.productRowEls = this.pageContainerEl.all(by.css('.product-list-row'));
};

AdminProductsPage.prototype.visit = function() {
  var login_page = require('./../admin/admin_login.po.js');
  login_page.login();

  var me = this;
  this.productRowEls.count().then( function( count ) {
    me.product_count = count;
  });
  browser.get('/admin/products');
};

module.exports = new AdminProductsPage();

