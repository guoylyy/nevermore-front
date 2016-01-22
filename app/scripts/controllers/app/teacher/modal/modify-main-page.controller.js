;void function(){

	angular.module("nevermore")
			.controller("ModifyMainPageController", ModifyMainPageController)

	ModifyMainPageController.$inject = ["$scope", "data", "ClazzFactory", 
		"httpResponseFactory", "errorHandlerFactory"]

	function ModifyMainPageController($scope, data, ClazzFactory, 
		httpResponseFactory, errorHandlerFactory){

		var errorHandler = errorHandlerFactory.handle
		var classID = data.classID

		$scope.content = data.content
		$scope.modifyContent = modifyContent

		function modifyContent(){
			//提交
			updateContent()
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					$scope.closeThisDialog("modify")
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function updateContent(){
			return ClazzFactory.mainPage().put({
				id: classID,
			}, {
				content: $scope.content
			}).$promise
		}

	}

}()