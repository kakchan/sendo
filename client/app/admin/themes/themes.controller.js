'use strict';

angular.module('sendoApp')
  .controller('ThemesController', function ($scope, Theme) {
    var init = function() {
      $scope.$parent.page_title = CONFIG.APP_NAME + " | Themes";
      Theme.query(themes_receive_handler);
    };

    var themes_receive_handler = function( resp ) {
      var themes = resp.themes_info;
      $scope.themes = themes;
    };

    init();
  });
