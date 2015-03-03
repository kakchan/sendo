'use strict';

angular.module("sendoApp")
  .directive( "sdMessagePanel", function() {
    return {
      restrict: "C",
      replace: true,
      scope: {
        message: "=",
        show: "=",
        loading: "=",
        error: "="
      },
      templateUrl: "components/message_panel/message_panel.html",
      link: function( $scope ) {
        $scope.close = function() {
          $scope.show = false;
        };
      }
    };
  });
