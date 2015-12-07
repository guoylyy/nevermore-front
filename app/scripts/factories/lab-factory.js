'use strict';

/**
 * @ngdoc service
 * @name labcloud.labService
 * @description
 * # labService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Lab', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/lab';
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};

    return {
      template : function(){
        return {
          "number":"",
          "name":"",
          "description":"",
          "active":true,
          "capacity":0,
          "machineCount":0
        };
      },
      fid: function() {
        return $resource(baseUrl + '/:id', {id:'@id'}, {
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
        });
      },
      create: function() {
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        })
      },
      all: function() {
        return $resource(baseUrl + '/list/all', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
