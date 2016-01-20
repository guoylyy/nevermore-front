;void function(){
	angular.module("nevermore")
			.controller("TeacherMainPageController", TeacherMainPageController)

	TeacherMainPageController.$inject = ["$scope", "ClazzFactory",
		"httpResponseFactory", "ToasterTool", "ManagementService"]

	function TeacherMainPageController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool, ManagementService){

		$scope.mainPage = {}
		$scope.class = {}

		$scope.modifyMainPage = modifyMainPage


		getClass()
		getMainPage()

		function getClass(){
			ClazzFactory.clazz().get({
				id: $scope.classID,
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.class)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function getMainPage(){
			ClazzFactory.mainPage().get({
				id: $scope.classID,
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
			return
			var templateUrl = "tpl/app/admin/modal/rich-modify-experiment-course.html"
			var controller = "RichModifyCourseCtrl"
			var richModifyDialog = new ManagementService.RichModifyDialog()
			richModifyDialog.setCloseListener(updateMainPage)
			richModifyDialog.open($scope.mainPage.content, templateUrl, controller, {})
		}

		function updateMainPage(data){
			if(data.status !== "modify"){
				return
			}

			var content = data.content

		}
	}
}()
