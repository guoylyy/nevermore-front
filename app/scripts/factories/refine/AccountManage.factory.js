'use strict';

/**
 * 用户相关 api
 */
angular.module('nevermore')
  .factory('AccountManageFactory', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url + "/manage/account"
    return {
      create: function(){
        return $resource(apiUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      account: function(){
        return $resource(apiUrl + '/:id', {id:"@id"}, {
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
        return $resource(apiUrl + '/:role?scope=list', {
          role: "@role",
          pageSize:"@pageSize",
          pageNum:"@pageNum"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      all: function(){//获取所有用户 ~ students | teachers
        return $resource(apiUrl + '/:role?scope=all', {
          role: "@role"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      search: function(){//搜索用户 ~ students | teachers
        return $resource(apiUrl + '/search', {
          keyword:"@keyword",
          role:"@role"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
