;void function(){
	angular.module("nevermore")
			.controller("StudentMainPageController", StudentMainPageController)

	StudentMainPageController.$inject = ["$scope", "ClazzFactory",
		"httpResponseFactory", "ToasterTool", "ManagementService", "errorHandlerFactory"]

	function StudentMainPageController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool, ManagementService, errorHandlerFactory){

		var errorHandler = errorHandlerFactory.handle
		
		$scope.mainPage = {}

		getMainPage()

		function getMainPage(){
			ClazzFactory.mainPage().get({
				id: $scope.class.id,
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.mainPage)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}
	}
	
}()