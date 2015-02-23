'use strict';

var AdminProductsPage = function() {
  this.pageContainerEl = element(by.css('.page-container'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  this.addProductButtonEl = this.pageContainerEl.element(by.css('.btn-add-product'));
};

AdminProductsPage.prototype.visit = function() {
  var login_page = require('./../admin/admin_login.po.js');
  login_page.login();

  browser.get('/admin/products');
};

module.exports = new AdminProductsPage();

