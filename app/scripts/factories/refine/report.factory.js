;void function(){
  angular.module("nevermore")
          .factory("ReportFactory", report)

  report.$inject = ["$resource", "sessionService", "$rootScope"]
  function report($resource, sessionService, $rootScope){
    var apiUrl = report_Url + "/report";

    return {
      template: template,
      report: report,
      save: save,
      answer: answer,
    }

    function template(){
      return $resource(apiUrl + '/template/:expId', {expId:'@expId'}, {
        'get': {
          method: 'GET'
        }
      });
    }

    function report(){
      return $resource(apiUrl + '/:stuId/:classId/:expId', {stuId:'@stuId', classId:'@classId', expId:'@expId'}, {
        'get': {
          method: 'GET'
        },
        'post': {
          method: 'POST'
        }
      })
    }

    function save(){
      return $resource(apiUrl, {}, {
        'post': {
          method: 'POST'
        }
      })
    }

    function answer(headers){
      return $resource(apiUrl + '/answer/:expId', {expId:'@expId'}, {
        'get': {
          method: 'GET',
          headers: headers
        }
      });
    }
  }

}()
