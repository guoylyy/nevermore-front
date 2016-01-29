;void function(){

	angular.module("nevermore")
			.controller("ModifyMainPageController", ModifyMainPageController)

	ModifyMainPageController.$inject = ["$scope", "data", "ClazzFactory", 
		"HttpResponseFactory", "ErrorHandlerFactory"]

	function ModifyMainPageController($scope, data, ClazzFactory, 
		HttpResponseFactory, ErrorHandlerFactory){

		var errorHandler = ErrorHandlerFactory.handle
		var classID = data.classID

		$scope.content = data.content
		$scope.modifyContent = modifyContent

		function modifyContent(){
			//提交
			updateContent()
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
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