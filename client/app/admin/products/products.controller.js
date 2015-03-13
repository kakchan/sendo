'use strict';

angular.module('sendoApp')
  .controller('ProductsController', function ($scope, $location, Product) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Products";
      Product.query(products_receive_handler);
    };

    var products_receive_handler = function( resp ) {
      var products = resp.products;
      $scope.products = products.map( function( product ) {
        var featured_image_result;
        if ( product.images ) {
          featured_image_result = product.images.filter( function( image ) {
            return image.is_featured === true;
          } );
        }
        if ( featured_image_result === undefined || featured_image_result.length === 0 ) {
          product.featured_image = "/assets/images/no_image.png";
        } else {
          product.featured_image = $scope.config.product_photo_uri + "/" + featured_image_result[0].filename;
        }
        return product;
      });
      $scope.current_page = resp.current_page;
      $scope.no_of_pages = resp.total_pages;
    };

    /* Event Handlers */
    $scope.add_product_click = function() {
      $location.path("/admin/products/add");
    };

    $scope.product_click = function(index) {
      var selected_product = $scope.products[ index ];
      $location.path("/admin/products/edit/" + selected_product._id );
    };

    $scope.go_to_page_click = function( page ) {
      Product.query({ page: page }, products_receive_handler);
    };

    init();
  });
