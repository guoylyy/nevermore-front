;void function(){

  'use strict';

  angular.module('nevermore')
    .factory('clazzFactory', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url+'/clazz'

    return {
      teacherClazzList: teacherClazzList,
      mainPage: mainPage,
      files: files,
      file: file,
      students: students,
      student: student,
    }
    //教师班级列表
    function teacherClazzList(){
      return $resource(apiUrl + "/teacherClazzList", null, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }
    //课程主页
    function mainPage(){
      return $resource(apiUrl + "/:id/mainPage", {
        id: "@classID"
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers(),
        }
      })
    }
    //上传文件
    function file(){
      return $resource(apiUrl + "/:id/file", {
        id: "@classID",
      }, {
        post: {
          method: "POST",
          headers: sessionService.headers(),
        }
      })
    }
    //获取文件
    function files(){
      return $resource(apiUrl + "/:id/files", {
        id: "@classID",
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers(),
        }
      })
    }
    //学生列表管理
    function students(){
      return $resource(apiUrl + "/:id/students", {
        id: "@id",
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers(),
        },
        post: {
          method: "POST",
          headers: sessionService.headers(),
        },
        delete: {
          method: "DELETE",
          headers: sessionService.headers(),
        }
      })
    }
    //添加一个学生
    function student(){
      return $resource(apiUrl + "/:id/student", {
        id: "@id",
      }, {
        post: {
          method: "POST",
          headers: sessionService.headers(),
        }
      })
    }

  })

}()
