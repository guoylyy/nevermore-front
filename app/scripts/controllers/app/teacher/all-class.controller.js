;void function(){

	app.controller("TeacherAllClassController", TeacherAllClassController)

	TeacherAllClassController.$inject = ["$scope", "clazzFactory", "ToasterTool", 
	"httpResponseFactory"]

	function TeacherAllClassController($scope, clazzFactory, ToasterTool,
		httpResponseFactory){

		$scope.classList = []

		getAllClass()

		function getAllClass(){
			clazzFactory.teacherClazzList().get({
				scope: "all",
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.classList)
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