'use strict';

var AdminLoginPage = function() {
  this.page_container_el = element(by.css('.page-container'));

  this.page_title_el = this.page_container_el.element(by.css('.admin-page-title'));
  this.emailFieldEl = this.page_container_el.element(by.name('email'));
  this.passwordFieldEl = this.page_container_el.element(by.name('password'));
  this.loginButtonEl = this.page_container_el.element(by.css('.btn-login'));
  this.emailValidationMessageEl = this.page_container_el.element(by.css('.email-validation-message'));
  this.mandatoryFieldsValidationMessageEl = this.page_container_el.element(by.css('.mandatory-fields-validation-message'));
  this.serverValidationMessageEl = this.page_container_el.element(by.css('.server-validation-message'));

  this.logoutLinkEl = element(by.css('.logout-link'));
};

AdminLoginPage.prototype.login = function() {
  browser.get('/admin');

  var me = this;
  this.logoutLinkEl.isDisplayed().then( function( is_displayed ) {
    if ( is_displayed ) {
      me.logoutLinkEl.click();
    }
  } );

  this.emailFieldEl.sendKeys("admin@laputan.me");
  this.passwordFieldEl.sendKeys("password");
  this.loginButtonEl.click();
};

module.exports = new AdminLoginPage();

