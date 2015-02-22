'use strict';

angular.module('sendoApp')
  .controller('ProductsController', function ($scope, $location) {
    $scope.$parent.page_title = "Products";

    /* Event Handlers */
    $scope.add_product_click = function() {
      $location.path("/admin/products/add");
    };
  });
