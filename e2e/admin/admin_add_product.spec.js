'use strict';

describe('Admin Add Product Page View', function() {
  beforeEach(function() {
    this._add_product_page = require('./../admin/admin_add_product.po.js');
    this._add_product_page.visit();

    this._products_page = require('./../admin/admin_products.po.js');
  });

  it('initial elements should display correctly', function() {
    // page title should be "Sendo | Add Product"
    expect(browser.getTitle()).toEqual('Sendo | Add Product');

    // should include "Products > Add Product" admin page header
    expect(this._add_product_page.pageTitleEl.getText()).toBe("Products > Add Product");

    // should contain "Products" link
    expect(this._add_product_page.pageTitleLinkEl.isDisplayed()).toBe(true);

    // should contain Title field
    expect(this._add_product_page.titleFieldEl.isDisplayed()).toBe(true);

    // should contain Description field
    expect(this._add_product_page.descriptionFieldEl.isDisplayed()).toBe(true);

    // should contain Page Title field
    expect(this._add_product_page.pageTitleFieldEl.isDisplayed()).toBe(true);

    // should contain Meta Description field
    expect(this._add_product_page.metaDescriptionFieldEl.isDisplayed()).toBe(true);

    // should contain Save button
    expect(this._add_product_page.saveButtonEl.isDisplayed()).toBe(true);
  });

  it('should redirect back to "Products" page after "Products" link is clicked', function() {
    expect(browser.getTitle()).toEqual('Sendo | Add Product');
    this._add_product_page.pageTitleLinkEl.click();
    expect(browser.getTitle()).toEqual('Sendo | Products');
  });

  it('should create a new product when "Save" button is clicked', function() {
    this._add_product_page.titleFieldEl.sendKeys("Product 1");
    this._add_product_page.descriptionFieldEl.sendKeys("Product Description 1");
    this._add_product_page.pageTitleFieldEl.sendKeys("Product 1 - Page Title");
    this._add_product_page.metaDescriptionFieldEl.sendKeys("Product 1 - Meta Description");

    this._add_product_page.saveButtonEl.click();

    // product should be saved

    this._add_product_page.pageTitleLinkEl.click();
    expect(browser.getTitle()).toEqual('Sendo | Products');
    expect(this._products_page.productRowEls.count()).toBe(this._products_page.product_count+1);
  });
});
