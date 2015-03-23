'use strict';

var AdminAddProductPage = function() {
  this.messagePanelEl = element(by.css('.message-panel-container'));

  this.page_container_el = element(by.css('.page-container'));
  this.productTitleLabel = element(by.css('.product-title-label'));

  this.page_title_el = this.page_container_el.element(by.css('.admin-page-title'));
  this.pageTitleLinkEl = this.page_container_el.element(by.css('.admin-page-title-link'));

  this.titleFieldEl = this.page_container_el.element(by.id('product_title'));
  this.descriptionFieldEl = this.page_container_el.element(by.id('product_description'));

  // Photo
  this.uploadFileInputFieldEl = this.page_container_el.element(by.css('.file-upload-field'));
  this.photoThumbnailContainerEl = this.page_container_el.element(by.css('.photo-thumbnails-container'));

  this.pageTitleFieldEl = this.page_container_el.element(by.css("DIV[element-id='page_title']"));
  this.pageTitleInputFieldEl = this.pageTitleFieldEl.element(by.id('page_title'));
  this.pageTitleFieldCharacterCountLabelEl = this.pageTitleFieldEl.element(by.css(".input-field-chars-count"));


  this.metaDescriptionFieldEl = this.page_container_el.element(by.css("DIV[element-id='meta_description']"));
  this.metaDescriptionInputFieldEl = this.metaDescriptionFieldEl.element(by.id('meta_description'));
  this.metaDescriptionFieldCharacterCountLabelEl = this.metaDescriptionFieldEl.element(by.css(".input-field-chars-count"));

  this.urlHandleContainerEl = this.page_container_el.element(by.css("DIV[element-id='url_handle']"));
  this.urlHandleFieldEl = this.urlHandleContainerEl.element(by.css(".url-handle-input-field-form-control"));

  this.validationMessageEl = this.page_container_el.element(by.css('.validation-message'));

  this.saveButtonEl = this.page_container_el.element(by.css('.btn-save'));
};

AdminAddProductPage.prototype.visit_by_clicking_add_product = function() {
  var products_page = require('./admin_products.po.js');
  products_page.visit();
  products_page.add_product_button_el.click();
};

AdminAddProductPage.prototype.visit_by_click_product = function( index ) {
  var products_page = require('./admin_products.po.js');
  products_page.visit();
  products_page.product_row_els.get(index).click();
};

module.exports = new AdminAddProductPage();

