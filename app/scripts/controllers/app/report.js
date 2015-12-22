'use strict';
//
app.controller('ReportCtrl',  function($scope, $http, $state, $localStorage, $stateParams) {

  $scope.report_step = 1;

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.completed_question = 0;

  if ($localStorage.report==null){
    $localStorage.report = {};
  }

  var key = ""+$scope.exp_id;
  if (!$localStorage.report.hasOwnProperty(key)) {
    $http.get("tpl/app/report/test.json").success(function(data) {
      $scope.data = data;
      $localStorage.report[key] = data;
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
        if (data['answer']['answer']!=null&&data['answer']['answer']!=""&&data['answer']['answer']!=undefined) {
          $scope.completed_question++;
        }
      });
    }
  };

  $scope.question_change();

});
