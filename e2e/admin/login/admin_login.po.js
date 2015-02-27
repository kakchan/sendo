'use strict';

var AdminLoginPage = function() {
  this.pageContainerEl = element(by.css('.page-container'));

  this.pageTitleEl = this.pageContainerEl.element(by.css('.admin-page-title'));
  this.emailFieldEl = this.pageContainerEl.element(by.name('email'));
  this.passwordFieldEl = this.pageContainerEl.element(by.name('password'));
  this.loginButtonEl = this.pageContainerEl.element(by.css('.btn-login'));
  this.emailValidationMessageEl = this.pageContainerEl.element(by.css('.email-validation-message'));
  this.mandatoryFieldsValidationMessageEl = this.pageContainerEl.element(by.css('.mandatory-fields-validation-message'));
  this.serverValidationMessageEl = this.pageContainerEl.element(by.css('.server-validation-message'));
};

AdminLoginPage.prototype.login = function() {
  browser.get('/admin');
  this.emailFieldEl.sendKeys("admin@laputan.me");
  this.passwordFieldEl.sendKeys("password");
  this.loginButtonEl.click();
};

module.exports = new AdminLoginPage();

