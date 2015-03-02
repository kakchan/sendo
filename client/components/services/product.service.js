'use strict';

angular.module('sendoApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:controller', {
      id: '@_id'
    }, {
      upload_photo: {
        method: 'POST',
        headers: {
          'Content-Type': undefined,
          enctype:'multipart/form-data'
        },
        params: {
          controller: 'upload_photo'
        }
      },
      delete_photo: {
        method: "DELETE",
        params: {
          controller: "delete_photo"
        }
      }
    } );
  });
