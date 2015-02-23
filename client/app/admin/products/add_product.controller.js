'use strict';

angular.module('sendoApp')
  .controller('AddProductController', function ($scope) {
    $scope.$parent.page_title = CONFIG.APP_NAME + " | Add Product";

  });
