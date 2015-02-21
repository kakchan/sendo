'use strict';

angular.module('sendoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/products', {
        url: '/admin/products',
        templateUrl: 'app/admin/products/products.html',
        controller: 'ProductsController'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
