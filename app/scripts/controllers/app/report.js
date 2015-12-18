'use strict';

app.controller('ReportCtrl',  function($scope, $http, $state, $localStorage) {

  $scope.report_step = 1;

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

});
