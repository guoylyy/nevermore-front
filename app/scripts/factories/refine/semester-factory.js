'use strict';

/**
 * 学期相关api
 */
angular.module('nevermore')
  .factory('Semester', function ($resource, sessionService, $rootScope) {
    var baseUrl = "http://localhost:8080/manage/semester";
    //var baseUrl = base_Url+'/manage/semester';
    return {
      create: function(){
        return $resource(baseUrl,{},{
          'post':{
            method: 'POST',
            headers:sessionService.headers()
          }
        });
      },
      current: function(){
        return $resource(baseUrl + '/currentSemester',{},{
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          }
        });
      },
      semester:function(){
        return $resource(baseUrl + '/:id', {id:"@id"},{
          'put': {
            method: 'PUT',
            headers:sessionService.headers()
          },
          'delete': {
            method: 'DELETE',
            headers:sessionService.headers()
          }
        })
      },
      page: function() {//分页获取用户
        return $resource(baseUrl + '/semesters?scope=list', {
          pageSize: "@pageSize",
          pageNumber: "@pageNumber"
        }, {
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          }
        });
      }
    };
  });
