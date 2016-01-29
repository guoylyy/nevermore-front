'use strict';

app.controller('ReportResultController', ['$scope', '$stateParams', 'ClazzFactory',
  'ExperimentManageFactory', 'ReportFactory', 'AccountManageFactory', 'sessionService',
  'ToasterTool', 
   function($scope, $stateParams, ClazzFactory, ExperimentManageFactory, ReportFactory,
      AccountManageFactory, sessionService, ToasterTool) {

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.student_id = $stateParams.stuId;

  $scope.semester = sessionService.getCurrentSemester();

  $scope.isRole = function(role) {
    for (var i = 0; i < $scope.currentUser.roles.length; i++) {
      if ($scope.currentUser.roles[i].name.code == role) {
        return true;
      }
    }
    return false;
  }

  $scope.correct_answer_view = {
    'init_data':false,
    'graphic':false,
    'experiment_data':false
  }

  ClazzFactory.clazz().get({
    id: $scope.class_id
  }).$promise.then(function(response){
    if (response.code == "200") {
      $scope.clazz = response.data;
    }
  });

  ExperimentManageFactory.experiment().get({
    id: $scope.exp_id
  }).$promise.then(function(response){
    if (response.code == "200") {
      $scope.exp = response.data;
    }
  });

  AccountManageFactory.account().get({
    id: $scope.student_id
  }).$promise.then(function(response){
    if (response.code == "200") {
      $scope.student = response.data;
    }
  });

  ReportFactory.report().get({
    stuId: $scope.student_id,
    classId: $scope.class_id,
    expId: $scope.exp_id
  }).$promise.then(function(response){
    if (response.code == 200) {
      $scope.data = response.data.report;

      ReportFactory.answer({
        'token': response.data.token
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

}]);
