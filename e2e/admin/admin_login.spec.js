'use strict';

describe('Admin Login Page View', function() {
  var login_page;

  beforeEach(function() {
    browser.get('/admin');
    login_page = require('./../admin/admin_login.po.js');
  });

  it('should include "Login" login_page title', function() {
    expect(login_page.pageTitleEl.getText()).toBe("Login");
  });

  it('should include email and password fields', function() {
    expect(login_page.emailFieldEl.isDisplayed()).toBe(true);
    expect(login_page.passwordFieldEl.isDisplayed()).toBe(true);
  });

  it('should go to Products login_page after entering correct email/password', function() {
    login_page.emailFieldEl.sendKeys("admin@laputan.me");
    login_page.passwordFieldEl.sendKeys("password");
    login_page.loginButtonEl.click();

    browser.wait( function() {
      return browser.getCurrentUrl().then( function( url ) {
        return /\/admin\/products/.test(url);
      });
    });
  });

  it('should not go to products login_page if e-mail/password are invalid', function() {
    login_page.emailFieldEl.sendKeys("admin@laputan.me");
    login_page.passwordFieldEl.sendKeys("wrong_password");
    login_page.loginButtonEl.click();

    expect(browser.getCurrentUrl()).toMatch( /\/admin$/ );
    expect(login_page.serverValidationMessageEl.isDisplayed()).toBe( true );
    expect(login_page.serverValidationMessageEl.getText()).toBe( "This email/password is not correct.");
  });

  it('should display invalid email message if it is not a valid email', function() {
    login_page.emailFieldEl.sendKeys("admin");
    login_page.passwordFieldEl.sendKeys("wrong_password");
    login_page.loginButtonEl.click();

    browser.wait( function() {
      return login_page.emailValidationMessageEl.isDisplayed();
    });
  });

  it('should display mandatory field message if fields are empty', function() {
    login_page.loginButtonEl.click();

    browser.wait( function() {
      return login_page.mandatoryFieldsValidationMessageEl.isDisplayed();
    });
  });
});
