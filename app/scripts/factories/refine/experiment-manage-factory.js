'use strict';

/**
 * 实验相关 api
 */
angular.module('nevermore')
  .factory('ExperimentManage', function($resource, sessionService, $rootScope) {
    var baseUrl ="http://localhost:8080/manage/experiment";
    return {
      create: function(){
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      experiment: function(){
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
        return $resource(baseUrl + '/experiments?scope=list', {
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
        return $resource(baseUrl + '/experiments?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      labs: function() {
        return $resource(baseUrl + '/:id/labs', {id: "@id"}, {
          'put': {
            method: 'PUT',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
