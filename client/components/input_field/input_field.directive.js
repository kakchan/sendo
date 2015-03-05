// <input class="form-control" type="text" id="id" ng-model="model" maxlength="max_length"/>

'use strict';

angular.module('sendoApp')
  .directive('sdInputField', function () {
    return {
      restrict: 'C',
      scope: {
        model: "=",
        maxLength: "@",
        elementId: "@",
        elementTitle: "@"
      },
      replace: true,
      templateUrl: "components/input_field/input_field.html",
      link: function($scope, element) {
        $scope.$watch("model",function( model ) {
          if ( model ){
            $scope.model_text_length = model.length;
            return;
          }
          $scope.model_text_length = 0;
        });
      }
    }
  });
