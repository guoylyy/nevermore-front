;void function(){
	angular.module("nevermore")
			.controller("TeacherClassController", TeacherClassController)

	TeacherClassController.$inject = ["$scope", "$state"]

	function TeacherClassController($scope, $state){
		$state.go('app.teacher.class.main-page');
	}
}()