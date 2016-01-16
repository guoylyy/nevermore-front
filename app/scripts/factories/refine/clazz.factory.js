;void function(){

  'use strict';

  angular.module('nevermore')
    .factory('clazzFactory', function($resource, sessionService, $rootScope) {
    var apiUrl = base_Url+'/clazz'

    return {
      teacherClazzList: teacherClazzList,
      mainPage: mainPage,
      files: files,
    }

    function teacherClazzList(){
      return $resource(apiUrl + "/teacherClazzList", null, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }

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

  })

}()


