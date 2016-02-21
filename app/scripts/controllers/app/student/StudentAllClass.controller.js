;void function(){
	angular.module("nevermore")
			.controller("StudentAllClassController", StudentAllClassController)

	StudentAllClassController.$inject = ["$scope", "$rootScope", "ClazzFactory", "ToasterTool",
	"HttpResponseFactory", "ErrorHandlerFactory", "$state"]

	function StudentAllClassController($scope, $rootScope, ClazzFactory, ToasterTool,
		HttpResponseFactory, ErrorHandlerFactory, $state){

		var errorHandler = ErrorHandlerFactory.handle

		$scope.classList = []

		getAllClass()

		function getAllClass(){
			ClazzFactory.studentClazzList().get({
				scope: "all",
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.classList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}
	}
}()
