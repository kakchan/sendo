'use strict';

angular.module('sendoApp')
  .controller('ProductsController', function ($scope, $location) {
    $scope.$parent.page_title = CONFIG.APP_NAME + " | Products";

    /* Event Handlers */
    $scope.add_product_click = function() {
      $location.path("/admin/products/add");
    };
  });
