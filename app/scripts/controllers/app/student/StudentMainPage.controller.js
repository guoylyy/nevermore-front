;void function(){
	angular.module("nevermore")
			.controller("StudentMainPageController", StudentMainPageController)

	StudentMainPageController.$inject = ["$scope", "ClazzFactory",
		"HttpResponseFactory", "ToasterTool", "ManagementService", "ErrorHandlerFactory"]

	function StudentMainPageController($scope, ClazzFactory, HttpResponseFactory,
		ToasterTool, ManagementService, ErrorHandlerFactory){

		var errorHandler = ErrorHandlerFactory.handle
		
		$scope.mainPage = {}

		getMainPage()

		function getMainPage(){
			ClazzFactory.mainPage().get({
				id: $scope.class.id,
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.mainPage)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}
	}
	
}()