'use strict';

/**
 * @ngdoc service
 * @name labcloud.labService
 * @description
 * # labService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('FileUpload', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/file/';

    return {
      upload: function() {
        return $resource(baseUrl + 'upload', {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      fileId: function() {
        return $resource(baseUrl + 'sms/scheduler/:id', {
          id: "@id"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          },
          'delete': {
            method: 'DELETE',
            headers: sessionService.headers()
          }
        })
      }
    };
  });
