'use strict';

var AdminProductsPage = function() {
  this.pageContainerEl = element(by.css('.page-container'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  /*
   this.h1El = this.heroEl.element(by.css('h1'));
   this.imgEl = this.heroEl.element(by.css('img'));
   */
};

AdminProductsPage.prototype.go_to_admin_products_page = function() {
  var login_page = require('./../admin/admin_login.po.js');
  login_page.login();

  browser.get('/admin/products');
};

module.exports = new AdminProductsPage();

