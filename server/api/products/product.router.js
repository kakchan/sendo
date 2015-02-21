var Product = require('./product.model');

exports.index = function(req, res) {
  Product.find({}, function (err, products) {
    if(err) return res.send(500, err);
    res.json(200, products);
  });
};
