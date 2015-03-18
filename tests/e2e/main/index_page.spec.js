'use strict';
var config = require("../../../server/config/environment");

describe('Index Page', function() {
  it( "should display correct", function() {
    var web_driver = browser.driver;
    web_driver.get('http://' + config.host + ':' + config.port );
    this.page_header_el = web_driver.findElement(by.css('h1'));
    expect(this.page_header_el.getText()).toEqual("Index");
  });
});
