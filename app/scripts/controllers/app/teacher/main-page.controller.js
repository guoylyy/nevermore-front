;void function(){
	angular.module("nevermore")
			.controller("TeacherMainPageController", TeacherMainPageController)

	TeacherMainPageController.$inject = ["$scope", "ClazzFactory", "httpResponseFactory", 
		"ToasterTool", "ManagementService", "errorHandlerFactory"]

	function TeacherMainPageController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool, ManagementService, errorHandlerFactory){

		var errorHandler = errorHandlerFactory.handle

		$scope.mainPage = {}

		$scope.modifyMainPage = modifyMainPage
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

		function modifyMainPage(){	
			var templateUrl = "tpl/app/teacher/modal/modify-main-page.html"
			var controller = "ModifyMainPageController"
			var richModifyDialog = new ManagementService.RichModifyDialog()
			richModifyDialog.setCloseListener(updateMainPage)
			richModifyDialog.open({
				classID: $scope.class.id,
				content: $scope.mainPage.content
			}, templateUrl, controller, {})
		}

		function updateMainPage(){
			getMainPage()
			ToasterTool.success("修改实验课程主页成功！")
		}
	}
}()
