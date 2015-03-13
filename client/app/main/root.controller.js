'use strict';

angular.module('sendoApp')
  .controller('RootController', function ($scope, GeneralService) {
    $scope.page_title = "Sendo";

    var init = function() {
      $scope.get_config();
    };

    $scope.get_config = function() {
      GeneralService.config(function(resp) {
        $scope.config = resp;
      });
    };

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

    init();
  });
