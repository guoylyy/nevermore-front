;void function(){

  'use strict';

  angular.module('nevermore')
    .factory('ClazzFactory', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url+'/clazz'

    return {
      teacherClazzList: teacherClazzList,
      experiments: experiments,
      mainPage: mainPage,
      files: files,
      file: file,
      students: students,
      student: student,
      removeFile: removeFile,
      clazz: clazz,
      studentList: studentList,
      uploadStudentList: uploadStudentList,
      experimentRecords: experimentRecords,
      experimentReports: experimentReports
    }

    //获取班级下的实验
    function experiments(){
      return $resource(apiUrl + "/:id/experiments", null, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }

    //获取班级下实验完成记录列表
    function experimentRecords(){
      return $resource(apiUrl + "/:id/experiment/:expId/records", {
        id: '@id',
        expId: '@expId'
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }

    //获取班级下实验报告列表
    function experimentReports(){
      return $resource(apiUrl + "/:id/experiment/:expId/reports", {
        id: '@id',
        expId: '@expId'
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
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
        id: "@id",
      }, {
        post: {
          method: "POST",
          headers: sessionService.headers(),
        }
      })
    }
    //移除文件
    function removeFile(){
      return $resource(apiUrl + "/:id/file/:fileId", {
        id: "@id",
        fileId: "@fileId"
      }, {
        delete: {
          method: "DELETE",
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

    function clazz(){
      return $resource(apiUrl + "/:id", null, {
        get: {
          method: "GET",
          headers: sessionService.headers(),
        }
      })
    }

    //关联公有附件
    function attach() {
      return $resource(apiUrl + "/:id/file", {id: "@id"},{
        post: {
          method: "POST",
          headers: sessionService.headers()
        }
      });
    }

    //从附件读取学生列表
    function studentList() {
      return $resource(apiUrl + "/:id/students", {id: "@id"}, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      });
    }

    //上传学生列表
    function uploadStudentList(){
      return $resource(apiUrl + "/:id/students",{id: "@id"}, {
        post:{
          method: "POST",
          headers: sessionService.headers()
        }
      });
    }

  })

}()
