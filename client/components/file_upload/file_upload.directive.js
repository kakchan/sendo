'use strict';

angular.module('sendoApp')
  .directive('sdFileUpload', function (Product) {
    return {
      restrict: 'C',
      scope: {
        onFileChanged: "=",
        images: "="
      },
      replace: true,
      templateUrl: "components/file_upload/file_upload.html",
      link: function(scope, element) {
        var $fileUploadEl = element.find( ".file-upload-field" );
        $fileUploadEl.on( "change", function() {
          var form_data = new FormData();
          $.each(this.files, function(key, value)  {
            form_data.append(key, value);
          });
          scope.onFileChanged(form_data);
        } );
      }
    };
  });
