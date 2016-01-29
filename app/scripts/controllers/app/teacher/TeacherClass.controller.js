;void function(){
	angular.module("nevermore")
			.controller("TeacherClassController", TeacherClassController)

	TeacherClassController.$inject = ["$scope", "clazz"]

	function TeacherClassController($scope, clazz){
		$scope.class = clazz
	}
}()