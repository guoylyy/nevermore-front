
app.controller("ViewStudentListController",["$scope", "data",
  function($scope, data){
	   $scope.stuList = data.data;
}])
