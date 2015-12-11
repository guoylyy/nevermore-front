'use strict';

app.controller('TeacherClassCtrl', function($scope,$stateParams,qService,Exp,generalService,Clazz,StudentRecord) {

  $scope.course_name= $stateParams.name;
  $scope.course_number = $stateParams.number;
  var class_id = $stateParams.id;
  var exp_id;

  var pageSize = generalService.pageSize();

  $scope.tab = 'experiment';

  $scope.students = {
      data:[],
      totalPageNum: 0,
      curPageNum:1,
      totalItemNum:0
  };

  $scope.records = {
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

  $scope.page_student = function(pageNumber) {
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

  $scope.view_student = function(){
    $scope.tab="student";
  }

  $scope.view_record = function(id){
    $scope.tab = 'record';
    exp_id = id;
  }

  $scope.page_record = function(pageNumber){

    qService.tokenHttpGet(StudentRecord.recordListByPage,{
        "clazzId": class_id,
        "experimentId": exp_id,
        "pageSize":pageSize,
        "pageNumber":pageNumber
    }).then(function(rc){
        $scope.records = rc;
    });
  }

});
