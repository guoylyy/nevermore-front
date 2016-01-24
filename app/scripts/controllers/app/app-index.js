'use strict';

app.controller('AppIndexController', ['$scope', '$state', '$rootScope', 'RoleFactory', function($scope,
    $state, $rootScope,RoleFactory) {

  transitStateByRole($scope.currentUser.roles);

  function transitStateByRole(role){
    if(RoleFactory.isAdmin(role)){
        $state.go('app.admin-account');
    }else if(RoleFactory.isTeacher(role)){
        $state.go('app.reservation');
    }else if(RoleFactory.isStudent(role)){
        $state.go('app.reservation');
    }else{
        $state.go('portal.login');
    }
  }

}]);
