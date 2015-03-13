var utils = require("../components/utils");
var create_sample_products = function() {
  var no_of_products = 205;
  var products = [];
  for ( var i=0; i<no_of_products; i++) {
    var product_id = i+1;
    product_id = utils.pad_zero(product_id, 3);
    products.push( {
      title: "Product " + product_id,
      description: "Product Description " + product_id,
      page_title: "Product Page Title " + product_id,
      meta_description: "Product Meta Description " + product_id
    } );
  }
  return products;
};

module.exports = create_sample_products();
