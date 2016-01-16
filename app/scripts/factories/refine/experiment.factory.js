;void function(){
  angular.module("nevermore")
          .factory("experiment", experiment)

  experiment.$inject = ["$resource", "sessionService", "$rootScope"]

  function experiment($resource, sessionService, $rootScope){
    var apiUrl = base_Url + '/experiment'
    var headers = sessionService.headers();

    return {
      labs: labs,
    };

    function labs(){
      return $resource(apiUrl + "/:id/labs", null, {
        get: {
          method: "GET",
          headers: headers
        }
      })
    }
  }

}()
