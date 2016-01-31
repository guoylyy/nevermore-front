app.controller("ViewReservationController",["$scope", "AccountManageFactory",
"data", "ReservationManageFactory", "AlertTool", "DateTool",
function($scope, AccountManageFactory, data, ReservationManageFactory, AlertTool,
				DateTool){
	$scope.resource = data.data
	var originResource = data.data

	$scope.teacherList = []

	$scope.step = 1
	$scope.viewTeacher = function(){
		$scope.step = 2
	}
	$scope.viewExperiment = function(){
		$scope.step = 1
	}

}])
