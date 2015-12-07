'use strict';

/**
 * @ngdoc service
 * @name labcloud.courseService
 * @description
 * # courseService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Course', function ($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/course';
    //var headers = sessionService.headers();
    var headers = {'x-auth-token': $rootScope.token};
    return {
      template: function(){
        return {
            "number":"",
            "name":"",
            "department":"",
            "active":true
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
      exps: function(){
        return $resource(baseUrl + '/:id/experiments', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        })
      },
      courseExps: function(){
        return $resource(baseUrl + '/:id/experiments_list', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        })
      },
      exp: function(){
        return $resource(baseUrl + '/:id/experiment/:expId', {
          id:'@id',
          expId:'@expId'
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
      all: function() {
        return $resource(baseUrl + '/list/all', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      listByStudent: function(){
        return $resource(baseUrl + '/list/student',{
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
