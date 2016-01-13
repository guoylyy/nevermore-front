'use strict';

/**
 * 班级相关 api
 */
angular.module('nevermore')
  .factory('AccountManage', function($resource, sessionService, $rootScope) {
    var baseUrl ="http://localhost:8080/manage/account";
    return {
      create: function(){
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      account: function(){
        return $resource(baseUrl + '/:id', {id:"@id"}, {
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
      page: function() { //分页获取用户 ~ students | teachers
        return $resource(baseUrl + '/:role', {
          role: "@role"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      all: function(){//获取所有用户 ~ students | teachers
        return $resource(baseUrl + '/:role?scope=all', {
          role: "@role"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
