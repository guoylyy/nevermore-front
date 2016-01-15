'use strict';

/**
 * 实验室相关 api
 */
angular.module('nevermore')
  .factory('LabManage', function($resource, sessionService, $rootScope) {
    var baseUrl ="http://localhost:8080/manage/lab";
    return {
      create: function(){
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      lab: function(){
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
      page: function() {
        return $resource(baseUrl + '/labs?scope=list', {
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
        return $resource(baseUrl + '/labs?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
