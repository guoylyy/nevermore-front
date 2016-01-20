'use strict';

app.controller('ReportResultCtrl',  function($scope, $rootScope, $stateParams, Clazz, Exp, qService, Report, sessionService, Account, ToasterTool) {

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.student_id = $stateParams.stuId;

  $scope.semester = sessionService.getCurrentSemester();

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

  qService.tokenHttpGet(Report.report, {
    stuId: $scope.student_id,
    classId: $scope.class_id,
    expId: $scope.exp_id
  }).then(function(rc){
    if (rc.code == 200) {
      $scope.data = rc.data.report;

      Report.answer({
        'token': rc.data.token
      }).get({
          expId: $scope.exp_id
        },
        function success(data, headers) {
          $scope.answer = data.data;
        },
        function error(data) {
          ToasterTool.error('获取数据错误发生!','');
        });
    }
    else {

    }
  });

  $scope.show = function (view){
    $scope.correct_answer_view[view]=true;
  }

  $scope.hide = function (view){
    $scope.correct_answer_view[view]=false;
  }

});
