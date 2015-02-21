'use strict';

angular.module('sendoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/home.html',
        controller: 'HomeController'
      });
  });
