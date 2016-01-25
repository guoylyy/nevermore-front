;void function(){
  angular.module("nevermore")
          .factory("slot", slot)

  slot.$inject = ["$resource", "sessionService", "$rootScope"]

  function slot($resource, sessionService, $rootScope){
    var apiUrl = base_Url + '/experiment'
    var headers = sessionService.headers();

    return {
      labs: labs,
    };

    function labs(){
      return $resource(apiUrl + "/:id/labs", null, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }
  }

}()
