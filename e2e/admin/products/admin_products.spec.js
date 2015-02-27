'use strict';

describe('Admin Products Page View', function() {
  var products_page;

  beforeEach(function() {
    products_page = require('./admin_products.po.js');
    products_page.visit();
  });

  it('initial elements should display correctly', function() {
    // page title should be "Sendo | Products"
    expect(browser.getTitle()).toEqual('Sendo | Products');

    // should include "Products" admin page header
    expect(products_page.pageTitleEl.getText()).toBe("Products");
  });
});
