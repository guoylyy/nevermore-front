'use strict';

/**
 * 班级相关 api 
 */
angular.module('nevermore')
  .factory('Clazz', function($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/clazz';
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};
    return {

      all: function(){
        return $resource(baseUrl + '/list/all', {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      create: function(){
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST',
            headers: sessionService.headers()
          }
        });
      },
      clazz: function(){
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
      page: function() { //分页获取用户
        return $resource(baseUrl + '/list/page/:pageSize/:pageNumber', {
          pageSize: "@pageSize",
          pageNumber: "@pageNumber"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },

      teacherClazzs: function(){
        return $resource(baseUrl + '/list/semester/:semesterId/teacher/:teacherId',
          {
            semesterId: "@semesterId",
            teacherId: "@teacherId"
          }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      clazzByTeacher: function(){
        return $resource(baseUrl, {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      clazzByStudent:function(){
        return $resource(baseUrl, {}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      studentListByPage: function(){
        return $resource(baseUrl + '/:id/student/list/page/:pageSize/:pageNumber',{
          id: "@id",
          pageSize: "@pageSize",
          pageNumber: "@pageNumber"
        },{
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      recordByStuClass: function(){
        return $resource(baseUrl + '/:clazzId/record/list', {
          clazzId: "@clazzId"
        },{
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      }
    };

  });
