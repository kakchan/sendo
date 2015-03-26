'use strict';

var config = require("../../../server/config/environment");

var CollectionPage = function() {
  this._page_el = element( by.css("html") );
};

CollectionPage.prototype.visit = function() {
  browser.ignoreSynchronization = true;
  browser.get('http://' + config.host + ':' + config.port + "/collection" );
};

module.exports = new CollectionPage();
