'use strict';

app.controller('TeacherClassCtrl', function($scope,$stateParams,qService,Exp,generalService,Clazz) {

  $scope.course_name= $stateParams.name;
  $scope.course_number = $stateParams.number;
  var class_id = $stateParams.id;

  var pageSize = generalService.pageSize();

  $scope.tab = 'experiment';

  $scope.students = {
      data:[],
      totalPageNum: 0,
      curPageNum:1,
      totalItemNum:0
  };

  qService.tokenHttpGet(Exp.statusListByClazz, {
      "classId": class_id
  }).then(function(rc){
      $scope.exps = rc;
  });

  $scope.view_student = function(pageNumber) {
    $scope.pages = [];
    $scope.tab="student";
    qService.tokenHttpGet(Clazz.studentListByPage, {
        "id": class_id,
        "pageSize": pageSize,
        "pageNumber": pageNumber
    }).then(function(rc){
        $scope.students = rc;
    });
  }

  $scope.view_exp = function() {
    $scope.tab="experiment";
  }

});
