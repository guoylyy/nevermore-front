/**
 * 实验文件管理类
 */
;void function(){
	angular.module("nevermore")
			.controller("TeacherFileController", TeacherFileController)

	TeacherFileController.$inject = ["$scope", "ClazzFactory", "httpResponseFactory",
		"ToasterTool"]

	function TeacherFileController($scope, ClazzFactory, httpResponseFactory,
		ToasterTool){

		$scope.publicFileList = []
		$scope.privateFileList = []

		getPublicFiles()
		getPrivateFiles()

		function getPublicFiles(){
			var fileType = "CLAZZ_PUBLIC"

			getFiles(fileType)
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.publicFileList)
				}else{
					throw new Error(response)
				}
			})
			.catch(errorHandler)
		}

		function getPrivateFiles(){
			var fileType = "CLAZZ_PRIVATE"
			getFiles(fileType)
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.privateFileList)
				}else{
					throw new Error(response)
				}
			})
			.catch(errorHandler)
		}

		function getFiles(fileType){
			return ClazzFactory.files().get({
				id: $scope.classID,
				type: fileType
			}).$promise
		}

		function errorHandler(error){
			if(httpResponseFactory.isServerResponse(error)){
				var message = httpResponseFactory.getResponseMessage(error)
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
		}
	}
}()
