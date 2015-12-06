'use strict';

app.controller('StudentReservationCtrl', ['$scope','$stateParams', function($scope, $stateParams) {

  $scope.title = $stateParams.title;

}]);
