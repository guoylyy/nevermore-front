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
      smsScheduler: function() {
        return $resource(baseUrl + 'sms/scheduler', {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        })
      },
      smsSchedulerId: function() {
        return $resource(baseUrl + 'sms/scheduler/:id', {
          id: "@id"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          },
          'put': {
            method: 'PUT',
            headers: sessionService.headers()
          },
          'delete': {
            method: 'DELETE',
            headers: sessionService.headers()
          }
        })
      },
      smsSchedulers: function() {
        return $resource(baseUrl + 'sms/schedulers', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
