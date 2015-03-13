'use strict';

angular.module('sendoApp')
  .factory('GeneralService', function ($resource) {
    return $resource('/admin/general/:controller', {},
      {
        config: {
          method: 'GET',
          params: {
            controller:'config'
          }
        }
      });
  });
