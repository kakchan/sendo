'use strict';

var AdminAddProductPage = function() {
  this.messagePanelEl = element(by.css('.message-panel-container'));

  this.pageContainerEl = element(by.css('.page-container'));
  this.productTitleLabel = element(by.css('.product-title-label'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  this.pageTitleLinkEl = this.pageContainerEl.element(by.css('.admin-page-title-link'));

  this.titleFieldEl = this.pageContainerEl.element(by.id('product_title'));
  this.descriptionFieldEl = this.pageContainerEl.element(by.id('product_description'));

  // Photo
  this.uploadFileInputFieldEl = this.pageContainerEl.element(by.css('.file-upload-field'));
  this.photoThumbnailContainerEl = this.pageContainerEl.element(by.css('.photo-thumbnails-container'));

  this.pageTitleFieldEl = this.pageContainerEl.element(by.id('page_title'));
  this.metaDescriptionFieldEl = this.pageContainerEl.element(by.id('meta_description'));

  this.validationMessageEl = this.pageContainerEl.element(by.css('.validation-message'));

  this.saveButtonEl = this.pageContainerEl.element(by.css('.btn-save'));
};

AdminAddProductPage.prototype.visit_by_clicking_add_product = function() {
  var products_page = require('./admin_products.po.js');
  products_page.visit();
  products_page.addProductButtonEl.click();
};

AdminAddProductPage.prototype.visit_by_click_product = function( index ) {
  var products_page = require('./admin_products.po.js');
  products_page.visit();
  products_page.productRowEls.get(index).click();
};

module.exports = new AdminAddProductPage();

