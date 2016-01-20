'use strict';

/**
 * @ngdoc service
 * @name labcloud.courseService
 * @description
 * # courseService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('CourseManage', function ($resource, sessionService, $rootScope) {
    var apiUrl = base_Url + "/manage/course"
    return {
      create: function(){
        return $resource(apiUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      course: function(){
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
      page: function() { //分页获取课程
        return $resource(apiUrl + '/courses?scope=list', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      all: function(){ //获取系统中所有可用课程
        return $resource(apiUrl + '/courses?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      experiments: function(){ //配置课程中所有实验
        return $resource(baseUrl + '/:id/experiments', {id: '@id'}, {
          'put': {
            method: 'PUT',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
