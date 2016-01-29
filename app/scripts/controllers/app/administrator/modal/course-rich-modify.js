app.controller("RichModifyCourseCtrl", ["$scope", "data", "CourseManageFactory", "ManagementService", "AlertTool",
	function($scope, data, CourseManageFactory, ManagementService, AlertTool) {

		var originResource = data,
			copiedResource = angular.copy(originResource);

		//通过course info api获取course主页信息
		loadInfo();

		$scope.pending = false;
		$scope.richModifyCourse = richModifyCourse;

		//获取课程主页
		function loadInfo(){
			CourseManageFactory.info().get({
				"id": originResource.id
			}).$promise.then(function(data){
				if (data.code == "200") {
					$scope.richContent  =  data.data.info;
				}
				else {
					$scope.richContent = '';
				}
			});
		}

		//修改课程主页
		function richModifyCourse () {

			if (resourceComplete()) {
					commitModify().$promise
							.then(removeErrorTip)
							.then(updateLocalResource)
							.then(function() {
									$scope.closeThisDialog("modify")
							})
							.catch(errorHandler)
			} else {
					errorHandler("请完整填写信息")
			}
		}
		function resourceComplete() {
				return true
		}
		function commitModify() {
				$scope.pending = true
				var submitResource = angular.copy(copiedResource);
				copiedResource.info = $scope.richContent
				submitResource.info = $scope.richContent
				return CourseManageFactory.info().put({
						"id": copiedResource.id,
				}, submitResource)
		}
		function updateLocalResource(data) {
				angular.copy(copiedResource, originResource)
		}

		// ~ Common
		function removeErrorTip(data) {
				$scope.errorTip = ""
				return data
		}
		function errorHandler(error) {
				$scope.pending = false
				var errorMessage = getErrorMessage(error)
				showErrorTip(errorMessage)
		}
		function getErrorMessage(error) {
				if (typeof error === "object") {
						return error.errorCode || error.toString()
				} else {
						return error.toString()
				}
		}
		function showErrorTip(error) {
				$scope.errorTip = error
		}
	}
]);
