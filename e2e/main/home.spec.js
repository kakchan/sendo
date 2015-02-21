'use strict';

describe('Home Page View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./home.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.pageContainerEl.getText()).toBe("Home");
  });
});
