'use strict';
var config = require("../../../server/config/environment");

describe('Product Page', function() {
  beforeEach( function() {
    this._product_page = require('./product_page.po');
    this._product_page.visit();
  } );

  it( "should display correct", function() {
    this.page_header_el = element(by.css('h1'));

    expect(this.page_header_el.getText()).toEqual("Product");
    expect(this._product_page._product_title_el.getText()).toEqual( "Product 001" );
    expect(this._product_page._product_image_el.getAttribute("src")).toMatch( "/uploads/photos/products/nikon_camera_1.JPG" );
  });
});
