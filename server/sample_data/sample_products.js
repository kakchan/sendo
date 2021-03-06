var utils = require("../components/utils");

var create_sample_products = function() {
  var no_of_products = 205;
  var products = [];
  for ( var i=0; i<no_of_products; i++) {
    var product_id = i+1;
    product_id = utils.pad_zero(product_id, 3);
    var product_data = {
      title: "Product " + product_id,
      description: "Product Description " + product_id,
      page_title: "Product Page Title " + product_id,
      meta_description: "Product Meta Description " + product_id,
      images: [],
      url_handle: utils.convert_to_url_handle_text("Product " + product_id)
    };
    if ( i === 0 ) {
      product_data.images = [
        {
          filename: "nikon_camera_1.JPG",
          size: 12345,
          is_featured: true
        },
        {
          filename: "nikon_camera_2.jpeg",
          size: 6789,
          is_featured: false
        }
      ];
    } else if ( i === 1 ) {
      product_data.images = [
        {
          filename: "green_apple.gif",
          size: 12345,
          is_featured: true
        },
        {
          filename: "Orange.gif",
          size: 12345,
          is_featured: false
        },
        {
          filename: "Pear.gif",
          size: 12345,
          is_featured: false
        },
        {
          filename: "red_apple.gif",
          size: 12345,
          is_featured: false
        },
        {
          filename: "Strawberry.gif",
          size: 12345,
          is_featured: false
        }
      ]
    }
    products.push(product_data );
  }
  return products;
};

module.exports = create_sample_products();
