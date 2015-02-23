'use strict';

describe('Admin Products Page View', function() {
  var product_page;

  beforeEach(function() {
    product_page = require('./../admin/admin_products.po.js');
    product_page.go_to_admin_products_page();
  });

  it('should include "Products" page title', function() {
    expect(product_page.pageTitleEl.getText()).toBe("Products");
  });
});
