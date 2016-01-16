;void function(){
  angular.module("nevermore")
          .factory("lab", lab)

  lab.$inject = ["$resource", "sessionService", "$rootScope"]

  function lab($resource, sessionService, $rootScope){
    var apiUrl = base_Url + "/lab"
    var headers = sessionService.headers();

    return {
      slots: slots,
    }    

    function slots(){
      return $resource(apiUrl + "/:id/slots", null, {
        get: {
          method: "GET",
          headers: headers,
        }
      })
    }
  }

}()
