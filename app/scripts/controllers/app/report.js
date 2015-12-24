'use strict';
//
app.controller('ReportCtrl',  function($scope, $rootScope, $state, $localStorage, $stateParams, Report, qService) {

  $scope.report_step = 1;

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.completed_question = 0;

  if ($localStorage.report==null){
    $localStorage.report = {};
  }

  var key = $scope.class_id+"-"+$scope.exp_id;
  if (!$localStorage.report.hasOwnProperty(key)) {
    qService.tokenHttpGet(Report.template, {
      expId: 1
    }).then(function(rc){
      $scope.data = rc.data;
      $localStorage.report[key] = rc.data;
    });
  }else {
    $scope.data = $localStorage.report[key];
  }

  $scope.next = function() {
    $scope.report_step++;
  }

  $scope.last = function() {
    $scope.report_step--;
  }

  $scope.question_change = function(){
    $scope.completed_question = 0;
    if ($scope.data) {
      $scope.data['7questions'].choice.forEach(function(data) {
        if (data['choice']['answer']!=null&&data['choice']['answer']!=""&&data['choice']['answer']!=undefined) {
          $scope.completed_question++;
        }
      });
      $scope.data['7questions'].text.forEach(function(data) {
        if (data['solution']['answer']!=null&&data['solution']['answer']!=""&&data['solution']['answer']!=undefined) {
          $scope.completed_question++;
        }
      });
    }
  };

  $scope.save = function () {
    $scope.data['1date'] = moment($scope.data['1date']).format('YYYY-MM-DD');
    var data = {
      'student_id':$rootScope.currentUser.number,
      'class_id':$scope.class_id,
      'experiment_id':$scope.exp_id,
      'report':$localStorage.report[key]
    }
    qService.tokenHttpPost(Report.save, {}, data).then(function(rc) {
      alert(rc);
    });
  }

  $scope.question_change();

});
