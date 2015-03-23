var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');
var config = require('./config/environment');
var async = require('async');
var Product = require('../server/admin/models/product.model');

var get_template_file = function( name, done ) {
  fs.readFile( config.themes_path + "/current/templates/" + name + ".ejs", { encoding: "utf8" }, done );
};

// home page
var home_endpoint = function(req, res) {
  get_template_file( "index", function( err, file ) {
    var html = ejs.render(file, {}, {});
    res.send( html );
  } );
};

// collection
var collection_endpoint = function(req, res) {
  async.auto({
    template_file: function( get_template_file_done ) {
      get_template_file("collection", get_template_file_done);
    },
    products: function (get_products_done) {
      Product
        .find( {} )
        .sort( { 'title': 1 } )
        //.skip( options.skip )
        .limit( 20 )
        .exec( function( err, products ) {
          if ( err ) {
            get_products_done( err );
            return;
          }
          products.forEach( function( product ) {
            var featured_image_urls = product.images.filter( function( image ) {
              return image.is_featured === true;
            } );
            if ( featured_image_urls && featured_image_urls.length > 0 ) {
              product.featured_image_url = config.product_photo_uri + "/" + featured_image_urls[0].filename;
            } else {
              product.featured_image_url = "/assets/images/no_image.png";
            }
          } );
          get_products_done( err, products );
        } );
    }
  }, function( err, results ) {
    var html = ejs.render(results.template_file, {
      locals: {
        products: results.products
      }
    }, {});
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
    "/products": products_endpoint,
    "/collection": collection_endpoint
  };
  for ( var endpoint_path in endpoints ) {
    app.get( endpoint_path, endpoints[endpoint_path]);
  }
};
