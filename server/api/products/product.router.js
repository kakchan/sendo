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
