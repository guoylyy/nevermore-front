app.controller("ViewExperimentAppointmentCtrl", ["$scope", "data",
function($scope, data){
	$scope.resource = data.data

	$scope.step = 1
	$scope.viewTeacher = function(){
		$scope.step = 2
	}
	$scope.viewExperiment = function(){
		$scope.step = 1
	}
}])
