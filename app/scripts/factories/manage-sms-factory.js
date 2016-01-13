'use strict';

/**
 * @ngdoc service
 * @name labcloud.labService
 * @description
 * # labService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('ManageSms', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/manage/';
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};

    return {
      smses: function() {
        return $resource(baseUrl + 'smses', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      smsConfig: function() {
        return $resource(baseUrl + 'sms/configuration', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          },
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        })
      }
    };
  });
