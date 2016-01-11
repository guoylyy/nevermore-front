'use strict';

app.controller('AppIndexController', ['$scope', '$state', '$rootScope', function($scope,
    $state, $rootScope) {
  var statusList = ['APPROVED', 'PENDING', 'REJECTED'];
  var studentResList = ['clazz', 'student'];

  $state.go('app.teacher.reservation');
  return

  if($rootScope.currentUser.show_role == 'TEACHER'){
    $state.go('app.teacher.reservation');
  }else if($rootScope.currentUser.show_role == 'STUDENT'){
    $state.go('app.index.student-reservations', {title: studentResList[0]});
  }
}]);
