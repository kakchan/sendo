'use strict';
var config = require("../../../server/config/environment");

describe('Product Page', function() {
  it( "should display correct", function() {
    var web_driver = browser.driver;
    web_driver.get('http://' + config.host + ':' + config.port + "/products/product-1234" );
    this.page_header_el = web_driver.findElement(by.css('h1'));
    expect(this.page_header_el.getText()).toEqual("Product");
  });
});
