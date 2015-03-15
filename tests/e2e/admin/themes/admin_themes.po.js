'use strict';

var AdminThemesPage = function() {
  this.page_container_el = element(by.css('.page-container'));

  this.page_title_el = this.page_container_el.element(by.css('.admin-page-title'));
};

AdminThemesPage.prototype.visit = function() {
  var login_page = require('../login/admin_login.po.js');
  login_page.login();
  browser.get('/admin/themes');
};

module.exports = new AdminThemesPage();

