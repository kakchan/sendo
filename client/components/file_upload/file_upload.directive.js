'use strict';

angular.module('sendoApp')
  .directive('sdFileUpload', function () {
    return {
      restrict: 'C',
      scope: {
        onFileChanged: "=",
        onFileDelete: "=",
        images: "="
      },
      replace: true,
      templateUrl: "components/file_upload/file_upload.html",
      link: function($scope, element) {
        $scope.uploading = false;

        var upload_files = function( files ) {
          $scope.uploading = true;

          var form_data = new FormData();
          $.each(files, function(key, value)  {
            form_data.append(key, value);
          });
          $scope.onFileChanged(form_data, function() {
            $scope.uploading = false;
          });
        };


        var $fileUploadEl = element.find( ".file-upload-field" );
        $fileUploadEl.on( "change", function() {
          upload_files( this.files );
        } );

        var $thumbnailContainerEl = element.find( ".photo-thumbnails-container" );
        $thumbnailContainerEl.on( {
          "dragover": function(ev) {
            ev.preventDefault();
            $scope.$apply( function() {
              $scope.dragPhoto = true;
              $scope.showAddUploadImage = true;
            } );
          },
          "dragleave": function(ev) {
            ev.preventDefault();
            $scope.$apply( function() {
              $scope.dragPhoto = false;
            } );
          },
          "drop": function(ev) {
            ev.preventDefault();
            $scope.dragPhoto = false;
            $scope.showAddUploadImage = false;
            upload_files( ev.originalEvent.dataTransfer.files );
          }
        } );

        /* Event Handlers */
        $scope.delete_photo_click = function(index) {
          var image = $scope.images[index];
          $scope.onFileDelete(image, function() {
            $scope.images.splice(index,1);
          });
        };
      }
    }
  });
