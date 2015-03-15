'use strict';

var AdminThemesPage = function() {
  this.page_container_el = element(by.css('.page-container'));

  this.page_title_el = this.page_container_el.element(by.css('.admin-page-title'));
  this.result_list_container_el = this.page_container_el.element(by.css('.list-container'));

  this.upload_a_theme_button_el = this.page_container_el.element(by.css('.btn-upload-a-theme'));
  this.visit_theme_store_button_el = this.page_container_el.element(by.css('.btn-visit-theme-store'));
};

AdminThemesPage.prototype.visit = function() {
  var login_page = require('../login/admin_login.po.js');
  login_page.login();
  browser.get('/admin/themes');
};

module.exports = new AdminThemesPage();

