var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');
var config = require('./config/environment');

var get_template_file = function( name, done ) {
  fs.readFile( config.themes_path + "/default/templates/" + name + ".ejs", { encoding: "utf8" }, done );
};

// home page
var home_endpoint = function(req, res) {
  get_template_file( "index", function( err, file ) {
    var html = ejs.render(file, {}, {});
    res.send( html );
  } );
};

// products/{product_name}
var products_endpoint = function(req, res) {
  get_template_file( "product", function( err, file ){
    var html = ejs.render(file, {}, {});
    res.send( html );
  } );
};

module.exports = function(app) {
  var endpoints = {
    "/": home_endpoint,
    "/products": products_endpoint
  };
  for ( var endpoint_path in endpoints ) {
    app.get( endpoint_path, endpoints[endpoint_path]);
  }
};
