'use strict';

angular.module('sendoApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:controller', {
      id: '@_id'
    });
  });
