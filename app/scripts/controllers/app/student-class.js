'use strict';

app.controller('StudentClassCtrl', function($scope,$stateParams, generalService, qService, Clazz, Course) {

    $scope.clazz = {};
    $scope.class_id = $stateParams.id;
    var exp_id;
    var pageSize = generalService.pageSize();
    $scope.exps = [];


    function init(){
      qService.tokenHttpGet(Clazz.clazz, {
        id: $scope.class_id
      }).then(function(rc){
        $scope.clazz = rc.data;
      });

      qService.tokenHttpGet(Course.exps, {
        "id": $scope.class_id
      }).then(function(rc) {
        $scope.exps = rc.data;
      });
    }

    $scope.$on('classchange',function (event, arg) {
      if ($scope.courses.length!=0) {
        $scope.class_id = $scope.courses[0].classId;
        init();
      }
    });

    if ($scope.class_id) {
      init();
    }else if ($scope.courses.length!=0) {
      $scope.class_id = $scope.courses[0].classId;
      init();
    }


});
