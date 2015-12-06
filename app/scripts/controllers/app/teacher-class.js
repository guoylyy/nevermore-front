'use strict';

app.controller('TeacherClassCtrl', ['$scope', '$stateParams',function($scope,$stateParams) {

  $scope.course_name= $stateParams.name;
  $scope.course_number = $stateParams.number;

}]);
