'use strict';

app.controller('PortalController', ['$scope','$rootScope','$state','$localStorage', function($scope, $rootScope, $state, $localStorage) {

  if ($localStorage.token!=null) {
    if ($localStorage.currentUser.show_role == 'STUDENT') {
      $state.go('app.index.student-reservations',{title:'clazz'});
    }else if ($localStorage.currentUser.show_role == 'TEACHER') {
      $state.go('app.index.teacher-reservations',{title:'APPROVED'});
    }else if ($localStorage.currentUser.show_role == 'ADMINISTRATOR') {
      $state.go('app.account-admin.admin-account');
    }

  }

}]);
