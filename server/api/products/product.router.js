var Product = require('./product.model');

exports.index = function(req, res) {
  Product.find({}, function (err, products) {
    if(err) {
      return res.send(500, err);
    }
    res.json(200, products);
  });
};

exports.create = function( req, res ) {
  var data = req.body;
  var product = new Product(data);
  product.save( function( err, new_product ) {
    if ( err ) {
      return res.send(500, err );
    }
    res.json(200, new_product );
  } );
};

exports.upload_photo = function( req, res ) {
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
