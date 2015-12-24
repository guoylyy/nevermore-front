'use strict';

app.controller('ReportResultCtrl',  function($scope, $http, $localStorage, $stateParams, Clazz, Exp, qService, sessionService, Account) {

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.student_id = $stateParams.stuId;

  $scope.semester = sessionService.getCurrSemeter();

  $scope.correct_answer_view = {
    'init_data':false,
    'graphic':false,
    'experiment_data':false
  }

  qService.tokenHttpGet(Clazz.clazz, {
    id: $scope.class_id
  }).then(function(rc){
    $scope.clazz = rc.data;
  });

  qService.tokenHttpGet(Exp.fid, {
    id: $scope.exp_id
  }).then(function(rc){
    $scope.exp = rc.data;
  });

  qService.tokenHttpGet(Account.account, {
    id: $scope.student_id
  }).then(function(rc){
    $scope.student = rc.data;
  });

  $http.get("tpl/app/report/test.json").success(function(data) {
    $scope.data = data;
  });

  $scope.show = function (view){
    $scope.correct_answer_view[view]=true;
  }

  $scope.hide = function (view){
    $scope.correct_answer_view[view]=false;
  }

});
