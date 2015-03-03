'use strict';

angular.module('sendoApp')
  .controller('RootController', function ($scope, $http) {
    $scope.page_title = "Sendo";

    $scope.showMessagePanel = function( text, duration, loading, error ) {
      if ( text === undefined || text.trim() === "" ) { return; }
      $scope.messagePanelText = text;
      $scope.messagePanelShow = true;
      $scope.messagePanelLoading = !!loading;
      $scope.messagePanelError = !!error;
      if ( duration ) {
        setTimeout( function() {
          $scope.$apply( function() {
            $scope.messagePanelShow = false;
          } );
        }, duration );
      }
    };

    $scope.hideMessagePanel = function() {
      $scope.messagePanelShow = false;
    };
  });
