;void function(){
	angular.module("nevermore")
			.controller("TeacherMainPageController", TeacherMainPageController)

	TeacherMainPageController.$inject = ["$scope", "ClazzFactory",
		"httpResponseFactory", "ToasterTool", "ManagementService"]

	function TeacherMainPageController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool, ManagementService){

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

		function errorHandler(error){
			if(httpResponseFactory.isServerResponse(error)){
				var message = httpResponseFactory.getResponseMessage(error)
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
		}

		function modifyMainPage(){
			var templateUrl = "tpl/app/teacher/modal/modify-main-page.html"
			var controller = "ModifyMainPageController"
			var richModifyDialog = new ManagementService.RichModifyDialog()
			richModifyDialog.setCloseListener(updateMainPage)
			richModifyDialog.open($scope.mainPage.content, templateUrl, controller, {})
		}

		function updateMainPage(){
			ToasterTool.success("修改实验课程主页成功！")
		}

		function commitMainPage(content){
			return new Promise()
		}
	}
}()
