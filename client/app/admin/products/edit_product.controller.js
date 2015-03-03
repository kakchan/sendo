'use strict';

angular.module('sendoApp')
  .controller('EditProductController', function ($scope, $stateParams, Product) {
    var init = function() {
      $scope.product = { images: [] };
      var product_id = $stateParams.product_id;
      if ( product_id ) {
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
      Product.save($scope.product, function() {
        $scope.showMessagePanel( "Product Saved!", 3000 );
      });
    };

    $scope.file_upload_changed = function(form_data, callback) {
      Product.upload_photo({}, form_data, function(resp) {
        $scope.product.images = $scope.product.images.concat(resp.files);
        callback && callback();
      });
    };

    $scope.file_delete = function(photo, callback) {
      Product.delete_photo( {filename: photo.filename}, {}, function( resp ) {
        callback && callback();
      } );
    };

    init();
  });
