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
    //var baseUrl = base_Url+'/manage/course';
    var baseUrl ="http://localhost:8080/manage/course";
    return {
      create: function(){
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      course: function(){
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
      page: function() { //分页获取课程
        return $resource(baseUrl + '/courses?scope=list', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      all: function(){ //获取系统中所有可用课程
        return $resource(baseUrl + '/courses?scope=all', {
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };
  });
