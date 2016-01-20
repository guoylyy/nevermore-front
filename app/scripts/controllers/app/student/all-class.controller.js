;void function(){
	angular.module("nevermore")
			.controller("StudentAllClassController", StudentAllClassController)

	StudentAllClassController.$inject = ["$scope", "$rootScope", "ClazzFactory", "ToasterTool",
	"httpResponseFactory", "errorHandlerFactory", "$state"]

	function StudentAllClassController($scope, $rootScope, ClazzFactory, ToasterTool,
		httpResponseFactory, errorHandlerFactory, $state){

		var errorHandler = errorHandlerFactory.handle

		$scope.classList = []

		getAllClass()

		function getAllClass(){
			ClazzFactory.studentClazzList().get({
				scope: "all",
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.classList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}
	}
}()
