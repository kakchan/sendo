'use strict';

angular.module('sendoApp')
  .factory('Theme', function ($resource) {
    return $resource('/admin/api/themes/:id/:controller', {
        id: '@_id'
      },
      {
        query: {
          method: 'GET',
          isArray: false
        }
      } );
  } );
