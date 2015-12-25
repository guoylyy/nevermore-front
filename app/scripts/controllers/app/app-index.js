'use strict';

app.controller('AppIndexController', ['$scope', '$state', '$rootScope', function($scope,
    $state, $rootScope) {
  var statusList = ['APPROVED', 'PENDING', 'REJECTED'];
  var studentResList = ['clazz', 'student'];

  if($rootScope.currentUser.show_role == 'TEACHER'){
    $state.go('app.index.teacher-reservations', {title: statusList[1]});
  }else if($rootScope.currentUser.show_role == 'STUDENT'){
    $state.go('app.index.student-reservations', {title: studentResList[0]});
  }
}]);
