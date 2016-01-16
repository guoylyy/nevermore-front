'use strict';

/**
 * @ngdoc service
 * @name labcloud.expService
 * @description
 * # expService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Exp', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/experiment';
    var new_baseUrl = base_Url + "/experiment"
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};
    return {
      template: function(){
        return {
            "number":"",
            "name":"",
            "minGrpStuCnt":0,
            "maxGrpStuCnt":0,
            "active":true,
            "virtualExpLink": "",
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
      },
      labs: function(){
        return $resource(new_baseUrl + '/:id/labs', {
          id:'@id'
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      lab: function(){
        return $resource(baseUrl + '/:id/lab/:labId', {
          id:'@id',
          labId:'@labId'
        }, {
          'delete': {
            method: 'DELETE',
            headers: sessionService.headers()
          },
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      statusListByClazz: function(){
        return $resource(baseUrl + '/statuslist/:classId', {
          classId: '@classId'
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
