'use strict';

app.controller('TeacherClassCtrl', function($scope,$stateParams,qService,Exp) {

  $scope.course_name= $stateParams.name;
  $scope.course_number = $stateParams.number;

  $scope.tab = 'experiment';

  qService.tokenHttpGet(Exp.statusListByClazz, {
      "classId": $stateParams.id
  }).then(function(rc){
      $scope.exps = rc;
  });

  $scope.view_student = function() {
    $scope.tab="student";
  }

  $scope.view_exp = function() {
    $scope.tab="experiment";
  }

});
