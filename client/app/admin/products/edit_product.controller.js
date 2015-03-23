'use strict';

var convert_to_url_handle_text = function( text ) {
  if ( !text ) { return ""; }
  return text.replace( /[^a-zA-Z0-9]/g, "-").toLowerCase();
};

angular.module('sendoApp')
  .controller('EditProductController', function ($scope, $stateParams, $location, Product) {
    $scope.auto_url_handle = true;

    var init = function() {
      $scope.product = { images: [] };
      var product_id = $stateParams.product_id;
      if ( product_id ) {
        $scope.auto_url_handle = false;
        $scope.page_name = "Edit Product";
        // load product details
        $scope.product = Product.get({ id: product_id });
        $scope.product.id = product_id;
      } else {
        $scope.page_name = "Add Product";
      }
      $scope.$parent.page_title = CONFIG.APP_NAME + " | " + $scope.page_name;
    };

    /* Event Handlers */
    $scope.save_click = function() {
      $scope.showMessagePanel( "Saving Product...", null, true );
      Product.save($scope.product, function(resp) {
        $scope.showMessagePanel( "Product Saved!", 3000 );
        $location.path("/admin/products/edit/" + resp._id );
      }, function(err) {
        $scope.hideMessagePanel();
        if ( err.status === 500 ) {
          $scope.validation_message = err.data[0]
        }
      });
    };

    $scope.file_upload_changed = function(form_data, callback) {
      Product.upload_photo({}, form_data, function(resp) {
        $scope.product.images = $scope.product.images.concat(resp.files);
        callback && callback();
      });
    };

    /* Watchers */
    $scope.$watch( "product.title", function( product_title ) {
      if ( $scope.auto_url_handle ) {
        $scope.product.url_handle = convert_to_url_handle_text( product_title );
      }
    } );

    /* Upload File directive Handlers */
    $scope.on_file_delete = function(photo, callback) {
      Product.delete_photo( {filename: photo.filename}, {}, function( resp ) {
        callback && callback();
      } );
    };

    $scope.on_mark_as_featured = function() {
    };

    init();
  });
