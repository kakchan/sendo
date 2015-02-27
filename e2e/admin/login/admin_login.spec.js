'use strict';

describe('Admin Login Page View', function() {
  beforeEach(function() {
    browser.get('/admin');
    this._login_page = require('./admin_login.po.js');
  });

  it('initial elements should display correctly', function() {
    // page title should be "Sendo | Login"
    expect(browser.getTitle()).toBe("Sendo | Login");

    // should include "Login" admin page header
    expect(this._login_page.pageTitleEl.getText()).toBe("Login");

    // should include email and password fields
    expect(this._login_page.emailFieldEl.isDisplayed()).toBe(true);
    expect(this._login_page.passwordFieldEl.isDisplayed()).toBe(true);
  });

  it('should go to Products login_page after entering correct email/password', function() {
    this._login_page.emailFieldEl.sendKeys("admin@laputan.me");
    this._login_page.passwordFieldEl.sendKeys("password");
    this._login_page.loginButtonEl.click();

    expect(browser.getCurrentUrl()).toMatch(/\/admin\/products/);
  });

  it('should not go to products login_page if e-mail/password are invalid', function() {
    this._login_page.emailFieldEl.sendKeys("admin@laputan.me");
    this._login_page.passwordFieldEl.sendKeys("wrong_password");
    this._login_page.loginButtonEl.click();

    expect(browser.getCurrentUrl()).toMatch( /\/admin$/ );
    expect(this._login_page.serverValidationMessageEl.isDisplayed()).toBe( true );
    expect(this._login_page.serverValidationMessageEl.getText()).toBe( "This email/password is not correct.");
  });

  it('should display invalid email message if it is not a valid email', function() {
    this._login_page.emailFieldEl.sendKeys("admin");
    this._login_page.passwordFieldEl.sendKeys("wrong_password");
    this._login_page.loginButtonEl.click();

    expect( this._login_page.emailValidationMessageEl.isDisplayed()).toBe(true);
  });

  it('should display mandatory field message if fields are empty', function() {
    this._login_page.loginButtonEl.click();

    expect(this._login_page.mandatoryFieldsValidationMessageEl.isDisplayed()).toBe(true);
  });
});
