'use strict';

/**
 * @ngdoc service
 * @name labcloud.semesterService
 * @description
 * # semesterService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Semester', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/semester';
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};
    // Public API here
    return {
      create: function(){
        return $resource(baseUrl,{},{
          'post':{
            method: 'POST',
            headers:sessionService.headers()
          }
        });
      },
      all: function(){
        return $resource(baseUrl + '/list/all',{},{
          'get':{
            method:'GET',
            headers: sessionService.headers()
          }
        });
      },
      slots: function(){
        return $resource(baseUrl + '/slots',{},{
          'get': {
            method: 'GET',
            headers: {'x-auth-token': $rootScope.token}
          }
        });
      },
      current: function(){
        return $resource(baseUrl + '/current',{},{
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          },
          'put': {
            method: 'PUT',
            headers:sessionService.headers()
          }
        });
      },
      semester:function(){
        return $resource(baseUrl + '/:id', {id:"@id"},{
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          },
          'put': {
            method: 'PUT',
            headers:sessionService.headers()
          },
          'delete': {
            method: 'DELETE',
            headers:sessionService.headers()
          }
        })
      },
      page: function() {//分页获取用户
        return $resource(baseUrl + '/list/page/:pageSize/:pageNumber', {
          pageSize: "@pageSize",
          pageNumber: "@pageNumber"
        }, {
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          }
        });
      }
    };
  });
