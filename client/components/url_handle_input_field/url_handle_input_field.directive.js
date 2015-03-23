'use strict';

angular.module('sendoApp')
  .directive('sdUrlHandleInputField', function () {
    return {
      restrict: 'C',
      scope: {
        model: "=",
        maxLength: "@",
        elementId: "@",
        elementTitle: "@",
        placeholder: "@",
        inputFieldPlaceholder: "@",
        isAutoUrlHandle: "="
      },
      replace: true,
      templateUrl: "components/url_handle_input_field/url_handle_input_field.html",
      link: function($scope, element) {
        var url_placeholder_el = element.find('.url-handle-placeholder');
        var input_field = element.find('.url-handle-input-field-form-control');
        $scope.$watch( "placeholder", function(text) {
          var placeholder_width = url_placeholder_el.outerWidth();
          input_field.css( {
            paddingLeft: placeholder_width + "px"
          });
        });

        input_field.on( "keypress", function() {
          $scope.isAutoUrlHandle = false;
        });
      }
    }
  });
