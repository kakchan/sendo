'use strict';

angular.module('sendoApp')
  .controller('ProductsController', function ($scope, $location, Product) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Products";
      $scope.products = Product.query();
    };

    /* Event Handlers */
    $scope.add_product_click = function() {
      $location.path("/admin/products/add");
    };

    init();
  });
