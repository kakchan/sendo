'use strict';

angular.module('sendoApp')
  .controller('AddProductController', function ($scope, Product) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Add Product";
      $scope.product = { images: [] };
    };

    /* Event Handlers */
    $scope.save_click = function() {
      Product.save($scope.product);
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
