'use strict';

app.controller('ReportResultCtrl', ['$scope', '$stateParams', 'ClazzFactory', 'ExperimentManage', 'ReportFactory', 'AccountManage', 'sessionService', 'ToasterTool', function($scope, $stateParams, ClazzFactory, ExperimentManage, ReportFactory, AccountManage, sessionService, ToasterTool) {

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

  $scope.correct_answer_view = [];

  ClazzFactory.clazz().get({
    id: $scope.class_id
  }).$promise.then(function(response){
    if (response.code == "200") {
      $scope.clazz = response.data;
    }
  });

  ExperimentManage.experiment().get({
    id: $scope.exp_id
  }).$promise.then(function(response){
    if (response.code == "200") {
      $scope.exp = response.data;
    }
  });

  AccountManage.account().get({
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
      $scope.new_data = response.data.report;
      for (var i = 0; i < $scope.new_data.content.length; i++) {
        $scope.correct_answer_view.push(false);
      }
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

  $scope.show = function (index){
    $scope.correct_answer_view[index]=true;
  }

  $scope.hide = function (index){
    $scope.correct_answer_view[index]=false;
  }

}]);
