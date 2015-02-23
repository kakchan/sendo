'use strict';

var AdminAddProductPage = function() {
  this.pageContainerEl = element(by.css('.page-container'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  this.pageTitleLinkEl = this.pageContainerEl.element(by.css('.admin-page-title-link'));

  this.titleFieldEl = this.pageContainerEl.element(by.id('product_title'));
  this.descriptionFieldEl = this.pageContainerEl.element(by.id('product_description'));
  this.pageTitleFieldEl = this.pageContainerEl.element(by.id('page_title'));
  this.metaDescriptionFieldEl = this.pageContainerEl.element(by.id('meta_description'));

  this.saveButtonEl = this.pageContainerEl.element(by.css('.btn-save'));
};

AdminAddProductPage.prototype.visit = function() {
  var products_page = require('./../admin/admin_products.po.js');
  products_page.visit();
  products_page.addProductButtonEl.click();
};

module.exports = new AdminAddProductPage();

