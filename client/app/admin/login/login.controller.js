'use strict';

angular.module('sendoApp')
  .controller('LoginController', function ($scope, Auth, $location) {
    $scope.$parent.page_title = CONFIG.APP_NAME + " | Login";

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/admin/products');
          $scope.get_config();
        })
        .catch( function(err) {
          $location.path('/admin');
          $scope.errors.other = err.message;
        });
      }
    };

  });
