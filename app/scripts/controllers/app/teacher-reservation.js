'use strict';

app.controller('TeacherReservationCtrl', ['$scope','$stateParams', function($scope, $stateParams) {

  $scope.title = $stateParams.title;

}]);
