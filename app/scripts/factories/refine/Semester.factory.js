'use strict';

/**
 * 学期相关api
 */
angular.module('nevermore')
  .factory('SemesterFactory', function ($resource, sessionService, $rootScope) {
    var apiUrl = base_Url + "/manage/semester"
    return {
      create: function(){
        return $resource(apiUrl,{},{
          'post':{
            method: 'POST',
            headers:sessionService.headers()
          }
        });
      },
      current: function(){
        return $resource(apiUrl + '/currentSemester',{},{
          'get': {
            method: 'GET',
            headers:sessionService.headers()
          }
        });
      },
      semester:function(){
        return $resource(apiUrl + '/:id', {id:"@id"},{
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
        return $resource(apiUrl + '/semesters?scope=list', {
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
