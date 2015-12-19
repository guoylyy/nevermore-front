'use strict';

app.controller('ReportCtrl',  function($scope, $http, $state, $localStorage) {

  $scope.report_step = 1;

  $scope.completed_question = 0;

  if ($localStorage.report == null) {
    $http.get("tpl/app/report/test.json").success(function(data) {
      $scope.data = $localStorage.report = data;
    });
  }else {
    $scope.data = $localStorage.report;
  }

  $scope.next = function() {
    $scope.report_step++;
  }

  $scope.last = function() {
    $scope.report_step--;
  }

  $scope.$watch("data['7questions']",function(){
    $scope.completed_question = 0;
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
  });

});
