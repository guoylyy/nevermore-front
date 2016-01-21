'use strict';

/**
 * 实验室相关 api
 */
angular.module('nevermore')
  .factory('LabManage', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url + "/manage/lab"
    return {
      create: function(){
        return $resource(apiUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      lab: function(){
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
      page: function() {
        return $resource(apiUrl + '/labs?scope=list', {
          pageSize:"@pageSize",
          pageNum:"@pageNum"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      all: function(){
        return $resource(apiUrl + '/labs?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      search: function(){//搜索实验室
        return $resource(apiUrl + '/search', {
          keyword:"@keyword"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
