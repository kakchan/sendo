'use strict';

angular.module('sendoApp')
  .directive('sdFileUpload', function () {
    return {
      restrict: 'C',
      scope: {
        onFileChanged: "=",
        onFileDelete: "=",
        onMarkAsFeatured: "=",
        images: "=",
        filePath: "="
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
        var get_featured_image = function() {
          return $scope.images.filter( function( image ) {
            return image.is_featured === true;
          })[0];
        };

        $scope.mark_as_featured_click = function( index ) {
          // reset featured image
          var featured_image = get_featured_image();
          featured_image.is_featured = false;

          // set the selected image to featured
          var image = $scope.images[index];
          image.is_featured = true;
        };

        $scope.delete_photo_click = function(index) {
          var image = $scope.images[index];
          $scope.onFileDelete(image, function() {
            $scope.images.splice(index,1);
          });
        };

        /* Watchers */
        $scope.$watch( "images", function( images ) {
          if ( images && images.length > 0 ) {
            var has_featured = images.filter( function( image ) {
              return image.is_featured;
            } ).length > 0;
            if (has_featured === false) {
              images[0].is_featured = true;
            }
          }
        },true );
      }
    }
  });
