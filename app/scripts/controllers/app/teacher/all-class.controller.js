;void function(){

	app.controller("TeacherAllClassController", TeacherAllClassController)

	TeacherAllClassController.$inject = ["$scope", "$rootScope", "ClazzFactory", "ToasterTool",
	"HttpResponseFactory", "ErrorHandlerFactory", "$state"]

	function TeacherAllClassController($scope, $rootScope, ClazzFactory, ToasterTool,
		HttpResponseFactory, ErrorHandlerFactory, $state){

		var errorHandler = ErrorHandlerFactory.handle

		$scope.classList = []

		getAllClass()

		function getAllClass(){
			ClazzFactory.teacherClazzList().get({
				scope: "all",
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.classList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function errorHandler(error){
			var message = HttpResponseFactory.getResponseMessage(error)
			if(!!message){
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
		}
	}
}()
