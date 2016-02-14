'use strict';
//
app.controller('ReportCtrl', ['$scope', '$state', 'AlertTool', '$stateParams', 'experiment', 'ReportFactory', 'ToasterTool', 'ClazzFactory', '$http', function($scope, $state, AlertTool, $stateParams, experiment, ReportFactory, ToasterTool, ClazzFactory, $http) {

  $scope.report_step = 1;

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.completed_question = 0;

  ReportFactory.report().get({
    stuId: $scope.currentUser.id+"",
    classId: $scope.class_id,
    expId: $scope.exp_id
  }).$promise.then(function(response) {
    if (response.code == "200") {
      $scope.data = response.data.report;
      $scope.status = response.data.status;
      $scope.data.student.name = $scope.currentUser.name;
      ClazzFactory.clazz().get({
        id: $scope.class_id
      }).$promise.then(function(response){
        if (response.code == "200") {
          $scope.data.student.class = response.data.course.name+" "+response.data.course.number;
        }
      });
      $scope.data['1date'] = new Date();
      $scope.question_change();
    }
    else {
      ReportFactory.template().get({
        expId: "1"
      }).$promise.then(function(response){
        $scope.data = response.data;
        $scope.status = response.data.status;
        $scope.data.student.name = $scope.currentUser.name;
        ClazzFactory.clazz().get({
          id: $scope.class_id
        }).$promise.then(function(response){
          $scope.data.student.class = response.data.course.name+" "+response.data.course.number;
        });
        $scope.data['1date'] = new Date();
        $scope.question_change();
      });
    }
  });

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
      'student_id':$scope.currentUser.id+"",
      'class_id':$scope.class_id,
      'experiment_id':$scope.exp_id,
      'report':$scope.data
    }
    ReportFactory.save().post({}, data).$promise.then(function(response){
      if (response.code == "200") {
        AlertTool.success({title:'保存成功！',text:''}).then(function() {
          $scope.status = 'uncommitted';
        });
      }else {
        AlertTool.error({title:'保存失败！',text:response.data}).then(function() {
        });
      }
    });
  }

  $scope.submit = function (){
    AlertTool.confirm({title:'确认提交?'}).then(function(isConfirm) {
      ReportFactory.report().post({
          stuId: $scope.currentUser.id+"",
          classId: $scope.class_id,
          expId: $scope.exp_id
      }).$promise.then(function(response){
        if (response.code == "200") {
            $scope.status = 'committed';
            $state.go('app.student.class.report-result',{expId:$scope.exp_id,classId:$scope.class_id,stuId:$scope.currentUser.id});
            var record = {
              "experimentRecord": response.data.report.final_score,
              "experimentComment": "",
              "clazzId": $scope.class_id,
              "experimentId": $scope.exp_id,
              "studentId": $scope.currentUser.id,
              "occurDate": new Date()
            };
            experiment.userReport().post({id: $scope.exp_id}, record).$promise.then(function(response){
              if (response.code == "200") {
                AlertTool.success({title:'提交成功！',text:''}).then(function() {});
              }else {
                AlertTool.error({title:'提交失败！',text:response.message}).then(function() {
                });
              }
            });
        }else if (response.code == 110) {
          AlertTool.error({title:'批改失败！',text:response.data}).then(function() {
          });
        }else{
          AlertTool.error({title:'批改失败！',text:response.data}).then(function() {
          });
        }
      });
    });
  }

  $http.get("tpl/app/report/test.json")
     .success(function(data){
      $scope.new_data = data;
     });

}]);
