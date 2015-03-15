'use strict';

var AdminProductsPage = function() {
  this.page_container_el = element(by.css('.page-container'));

  this.page_title_el = this.page_container_el.element(by.css('.admin-page-title'));
  this.add_product_button_el = this.page_container_el.element(by.css('.btn-add-product'));
  this.product_row_els = this.page_container_el.all(by.css('.product-list-row'));

  this.pagination_el = this.page_container_el.element(by.css('.sd-pagination'));
  this.result_list_container_el = this.page_container_el.element(by.css('.list-container'));

  this.pagination_prev_ten_page_el = this.page_container_el.element(by.css('.prev-ten-page'));
  this.pagination_prev_ten_page_disabled_el = this.page_container_el.element(by.css('.prev-ten-page-disabled'));

  this.pagination_next_ten_page_el = this.page_container_el.element(by.css('.next-ten-page'));
  this.pagination_next_ten_page_disabled_el = this.page_container_el.element(by.css('.next-ten-page-disabled'));
};

AdminProductsPage.prototype.visit = function() {
  var login_page = require('../login/admin_login.po.js');
  login_page.login();

  var me = this;
  this.product_row_els.count().then( function( count ) {
    me.product_count = count;
  });
  browser.get('/admin/products');
};

module.exports = new AdminProductsPage();

