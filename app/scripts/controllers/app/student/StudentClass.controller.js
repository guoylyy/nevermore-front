;void function(){
	angular.module("nevermore")
			.controller("StudentClassController", StudentClassController)

	StudentClassController.$inject = ["$scope", "clazz"]

	function StudentClassController($scope, clazz){
		$scope.class = clazz
	}
	
}()