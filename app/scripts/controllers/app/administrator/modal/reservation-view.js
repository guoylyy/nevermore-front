app.controller("ViewExperimentAppointmentCtrl", ["$scope", "data", "labTeachers",
function($scope, data, labTeachers){
	$scope.resource = data
	$scope.step = 1
	$scope.viewTeacher = function(){
		$scope.step = 2
	}
	$scope.viewExperiment = function(){
		$scope.step = 1
	}
	$scope.teacherList = labTeachers
}])
