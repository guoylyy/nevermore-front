'use strict';

app.controller('ReportCtrl',  function($scope, $state) {

  $scope.$on('report_step', function(event, data){
    $scope.report_step = data;
  });

});
