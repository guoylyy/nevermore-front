'use strict';

app.controller('AppIndexController', ['$scope', '$state', '$rootScope', function($scope,
    $state, $rootScope) {
  var statusList = ['APPROVED', 'PENDING', 'REJECTED'];
  var studentResList = ['clazz', 'student'];
  alert(123)

  $state.go('app.teacher.class');
  return

  if($rootScope.currentUser.show_role == 'TEACHER'){
    $state.go('app.reservation');
  }else if($rootScope.currentUser.show_role == 'STUDENT'){
    $state.go('app.reservations', {title: studentResList[0]});
  }
}]);
