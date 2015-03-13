var config = require('../../config/environment');

exports.index = function(req, res) {
  res.json( {
    product_photo_uri: config.product_photo_uri
  } );
};
