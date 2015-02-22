'use strict';

angular.module('sendoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin/users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'UsersController'
      })
      .state('admin/products', {
        url: '/admin/products',
        templateUrl: 'app/admin/products/products.html',
        controller: 'ProductsController'
      })
      .state('admin/login', {
        url: '/admin/login',
        templateUrl: 'app/admin/login/login.html',
        controller: 'LoginController'
      })
      .state('admin/signup', {
        url: '/admin/signup',
        templateUrl: 'app/admin/signup/signup.html',
        controller: 'SignupController'
      })
      .state('admin/settings', {
        url: '/admin/settings',
        templateUrl: 'app/admin/settings/settings.html',
        controller: 'SettingsController',
        authenticate: true
      });
  });
