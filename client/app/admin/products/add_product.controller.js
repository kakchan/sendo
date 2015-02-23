'use strict';

angular.module('sendoApp')
  .controller('AddProductController', function ($scope, Product) {
    $scope.$parent.page_title = CONFIG.APP_NAME + " | Add Product";
    $scope.product = {};

    /* Event Handlers */
    $scope.save_click = function() {
      Product.save($scope.product);
    };
  });
