'use strict';

/**
 * 实验相关 api
 */
angular.module('nevermore')
  .factory('ExperimentManage', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url + "/manage/experiment"
    return {
      create: function(){
        return $resource(apiUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      experiment: function(){
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
        return $resource(apiUrl + '/experiments?scope=list', {
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
        return $resource(apiUrl + '/experiments?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      labs: function() {
        return $resource(apiUrl + '/:id/labs', {id: "@id"}, {
          'put': {
            method: 'PUT',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
