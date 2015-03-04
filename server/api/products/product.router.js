var Product = require('./product.model');
var fs = require('fs');
var config = require('../../config/environment');
var utils = require('../../components/utils');

exports.index = function(req, res) {
  Product.find({}, function (err, products) {
    if(err) {
      return res.send(500, err);
    }
    res.json(200, products);
  });
};

exports.get = function( req, res ) {
  if ( !req.params.id ) {
    return res.send(500, "'id' is required");
  }
  Product.findById( req.params.id, function(err, product) {
    if (err){
      return res.send(500, err);
    }
    res.json(200, product);
  });
};

exports.create = function( req, res ) {
  var data = req.body;
  var product = new Product(data);
  product.save( function( err, new_product ) {
    if ( err ) {
      return res.send(500, utils.error_handler(err) );
    }
    res.json(200, new_product );
  } );
};

exports.upload_photo = function( req, res ) {
  if ( !req.files ) {
    return res.send( 500 );
  }
  var files = [];
  if (req.files) {
    for ( var key in req.files ) {
      var file = req.files[key];
      files.push( {
        filename: file.name,
        size: file.size
      } );
    }
  }
  res.json( { files: files } );
};

exports.delete_photo = function( req, res ) {
  var file_name = req.query.filename;
  if (!file_name) {
    return res.send(500);
  }
  fs.unlink( config.product_photo_path + "/" + file_name, function(err) {
    if(err) {
      return res.send(500, err);
    }
    res.json(200);
  } );
};
