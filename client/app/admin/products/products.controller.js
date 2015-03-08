'use strict';

angular.module('sendoApp')
  .controller('ProductsController', function ($scope, $location, Product) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Products";
      Product.query(function(resp) {
        $scope.products = resp.products;
        $scope.current_page = resp.current_page;
        $scope.no_of_pages = resp.total_pages;
      });
    };

    /* Event Handlers */
    $scope.add_product_click = function() {
      $location.path("/admin/products/add");
    };

    $scope.product_click = function(index) {
      var selected_product = $scope.products[ index ];
      $location.path("/admin/products/edit/" + selected_product._id );
    };

    init();
  });
