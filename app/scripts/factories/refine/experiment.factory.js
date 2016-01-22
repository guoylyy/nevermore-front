;void function(){
  angular.module("nevermore")
          .factory("experimentFactory", experiment)

  experiment.$inject = ["$resource", "sessionService", "$rootScope"]

  function experiment($resource, sessionService, $rootScope){
    var apiUrl = base_Url + '/experiment'
    var headers = sessionService.headers();

    return {
      labs: labs,
      userReport: userReport
    };

    function labs(){
      return $resource(apiUrl + "/:id/labs", null, {
        get: {
          method: "GET",
          headers: headers
        }
      })
    }

    function userReport(){
      return $resource(apiUrl + "/:id/userReport", {id: "@id"}, {
        post: {
          method: "POST",
          headers : headers
        }
      })
    }
  }

}()
