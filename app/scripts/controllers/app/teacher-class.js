'use strict';

app.controller('TeacherClassCtrl', function($scope,
    $stateParams, qService, Exp, generalService, Clazz, StudentRecord) {
  $scope.clazz = {};

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

  $scope.pageStudent = function() {
    qService.tokenHttpGet(Clazz.studentListByPage, {
        "id": class_id,
        "pageSize": pageSize,
        "pageNumber": $scope.students.curPageNum
    }).then(function(rc){
        $scope.students = rc;
    });
  };

  $scope.view_exp = function() {
    $scope.tab="experiment";
  }

  $scope.view_student = function(){
    $scope.tab="student";
  }

  $scope.view_record = function(id){
    $scope.tab = 'record';
    exp_id = id;
    $scope.pageRecord();
  }

  $scope.pageRecord = function(){
    qService.tokenHttpGet(StudentRecord.recordListByPage,{
        "clazzId": class_id,
        "experimentId": exp_id,
        "pageSize":pageSize,
        "pageNumber":$scope.records.curPageNum
    }).then(function(rc){
        $scope.records = rc;
    });
  }

  function init(){
    qService.tokenHttpGet(Clazz.clazz, {
      id: class_id
    }).then(function(rc){
      $scope.clazz = rc.data;
    });

    qService.tokenHttpGet(Exp.statusListByClazz, {
      "classId": class_id
    }).then(function(rc){
        $scope.exps = rc;
    });

    $scope.pageStudent();
  }

  $scope.$on('classchange',function (event, arg) {
    if ($scope.classes.length!=0) {
      class_id = $scope.classes[0].id;
      init();
    }
  });

  if (class_id) {
    init();
  }else if ($scope.classes.length!=0) {
    class_id = $scope.classes[0].id;
    init();
  }

});
