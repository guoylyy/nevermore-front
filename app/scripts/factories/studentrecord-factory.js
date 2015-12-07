'use strict';

/**
 * @ngdoc service
 * @name labcloud.clazzService
 * @description
 * # clazzService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('StudentRecord', function($resource, sessionService, $rootScope) {
    var baseUrl = base_Url+'/api/studentRecords';
    var headers = sessionService.headers();
    //var headers = {'x-auth-token': $rootScope.token};
    return {

      studentRecord: function(){
        return $resource(baseUrl , {
          student: "student",
          clazz: "clazz",
          experiment: "experiment"
        }, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      fileList: function(){
        return $resource(baseUrl + '/file/list/:recordId', {
          recordId: "@recordId"
        }, {
          'get':{
            method: 'GET',
            headers: sessionService.headers()
          }
        });
      },
      report:function(){
        return $resource('/api/report/generate/studentRecord/:srId',{
          srId:"@srId"
        },{
          'post':{
            method:'POST',
            headers: sessionService.headers()
          }
        });
      },
      lashenreport: function(){
        return $resource('http://labcom.tongji.edu.cn:8081/ReportService.asmx/GenerateLaShenReport',{},{
          'get':{
            method:'GET',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }
        });
      },
      niuzhuanreport: function(){
        return $resource('http://labcom.tongji.edu.cn:8081/ReportService.asmx/GenerateNiuZhuanReport',{},{
          'get':{
            method:'GET',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }
        });
      },
      recordListByPage:function(){
        return $resource(baseUrl + '/clazz/:clazzId/experiment/:experimentId/:pageNumber/:pageSize',{
          clazzId: "@clazzId",
          experimentId: "@experimentId",
          pageNumber:"@pageNumber",
          pageSize:"@pageSize"
        },{
          'get':{
            method:'GET',
            headers:headers
          }
        });
      },
      update:function(){
        return $resource(baseUrl + '/:id', {
          id:"@id"
        },{
          'put':{
            method:'PUT',
            headers:headers
          }
        });
      }
    };

  });
