;void function(){
  angular.module("nevermore")
          .factory("ExperimentFactory", experiment)

  experiment.$inject = ["$resource", "sessionService", "$rootScope"]

  function experiment($resource, sessionService, $rootScope){
    var apiUrl = base_Url + '/experiment'
    var headers = sessionService.headers();

    return {
      labs: labs,
      userReport: userReport,
      extractPicture: extractPicture,
      experimentTrain: experimentTrain
    };

    function labs(){
      return $resource(apiUrl + "/:id/labs", null, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }

    //根据 txt 文件获取图片
    function extractPicture(){
      return $resource(apiUrl + "/extractPicture/:attachId", {
        attachId : '@attachId'
      }, {
        get: {
          method: "GET",
          headers: sessionService.headers()
        }
      })
    }

    function userReport(){
      return $resource(apiUrl + "/:id/userReport", {id: "@id"}, {
        post: {
          method: "POST",
          headers : sessionService.headers()
        }
      })
    }

    //虚拟实验
    function experimentTrain(){
      return $resource(apiUrl + "/train", null, {
        post:{
          method: "POST"
        }
      })
    }
  }

}()
