'use strict';

app.controller('AppIndexController', ['$scope', '$state', '$rootScope', 'RoleFactory', function($scope,
    $state, $rootScope,RoleFactory) {

  transitStateByRole($scope.currentUser.roles);

  function transitStateByRole(role){
    if($scope.currentUser == null || $scope.currentUser == undefined){
      $state.go('portal.login');
    }else{
      $state.go('app.calendar');
    }
  }

}]);
