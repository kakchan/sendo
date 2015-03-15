'use strict';

angular.module('sendoApp')
  .controller('ThemesController', function ($scope) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Themes";
    };

    init();
  });
