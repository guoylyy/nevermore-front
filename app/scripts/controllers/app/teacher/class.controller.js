;void function(){
	angular.module("nevermore")
			.controller("TeacherClassController", TeacherClassController)

	TeacherClassController.$inject = ["$scope", "$stateParams"]

	function TeacherClassController($scope, $stateParams){

		$scope.classID = $stateParams.classID
	}
}()