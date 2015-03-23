'use strict';
var config = require("../../../server/config/environment");
var utils = require("../../../server/components/utils");

describe('Collection Page', function() {
  it( "should display correct", function(done) {
    var web_driver = browser.driver;
    web_driver.get('http://' + config.host + ':' + config.port + "/collection" );
    this.page_header_el = web_driver.findElement(by.css('h1'));
    expect(this.page_header_el.getText()).toEqual("Collection");

    var product_detail_els = web_driver.findElements(by.css('.collection-product-details'));
    product_detail_els.then( function(els) {
      expect(els.length).toEqual(20);
      els.forEach( function( el, index ) {
        var product_name = "Product " + utils.pad_zero(index + 1, 3);
        expect(el.getAttribute("href")).toMatch( "/products/" + utils.convert_to_url_handle_text(product_name) );

        var product_image_el = el.findElement(by.css('.collection-product-image'));
        expect(product_image_el.isDisplayed()).toEqual( true );

        var product_name_el = el.findElement(by.css('.collection-product-name'));
        expect(product_name_el.getText()).toEqual(product_name);
      } );
    });
    done();
  });
});
