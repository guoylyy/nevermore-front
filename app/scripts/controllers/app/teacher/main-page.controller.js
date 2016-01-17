;void function(){
	angular.module("nevermore")
			.controller("TeacherMainPageController", TeacherMainPageController)

	TeacherMainPageController.$inject = ["$scope", "ClazzFactory",
		"httpResponseFactory", "ToasterTool"]

	function TeacherMainPageController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool){

		$scope.mainPageContent = null

		getMainPage()


		function getMainPage(){
			ClazzFactory.mainPage().get({
				id: $scope.classID,
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					$scope.mainPageContent = data.content
				}else{
					throw new Error(response)
				}
			})
			.catch(errorHandler)
		}

		function errorHandler(error){
			var message = httpResponseFactory.getResponseMessage(error)

			if(!!message){
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
		}
	}
}()
