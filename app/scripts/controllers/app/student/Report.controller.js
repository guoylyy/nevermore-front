'use strict';
//
app.controller('ReportController', ['$scope', '$state', 'AlertTool', '$stateParams', 'ExperimentFactory', 'ReportFactory', 'ToasterTool', 'ClazzFactory', function($scope, $state, AlertTool, $stateParams, ExperimentFactory, ReportFactory, ToasterTool, ClazzFactory) {

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
      $scope.new_data = response.data.report;
      $scope.status = response.data.status;
      // $scope.new_data.student.name = $scope.currentUser.name;
      ClazzFactory.clazz().get({
        id: $scope.class_id
      }).$promise.then(function(response){
        if (response.code == "200") {
          $scope.clazz = response.data.course.name+" "+response.data.course.number;
          $scope.new_data.content[0].content = new Date();
          $scope.question_change();
        }
      });

    }
    else {
      ReportFactory.template().get({
        expId: $scope.exp_id
      }).$promise.then(function(response){
        if (response.code == "200") {
          $scope.new_data = response.data;
          $scope.status = response.data.status;
          // $scope.data.student.name = $scope.currentUser.name;
          ClazzFactory.clazz().get({
            id: $scope.class_id
          }).$promise.then(function(response){
            $scope.clazz = response.data.course.name+" "+response.data.course.number;
          });
          $scope.new_data.content[0].content = new Date();
          $scope.question_change();
        }else if (response.code == "404") {
          AlertTool.warning({title:'提示',text:"该实验不存在实验报告模板"}).then(function() {
            $state.go('app.student.class.task');
          });
        }else{
          AlertTool.error({title:'获取错误',text:response.data}).then(function() {
          });
        }
      });
    }
  });

  $scope.name = $scope.currentUser.name;

  $scope.next = function() {
    $scope.report_step++;
  }

  $scope.last = function() {
    $scope.report_step--;
  }

  $scope.question_change = function(){
    $scope.completed_question = 0;
    for (var i = 0; i < $scope.new_data.content.length; i++) {
      if ($scope.new_data.content[i].text == "问题讨论") {
        $scope.questions = $scope.new_data.content[i].content;
      }
    }
    if ($scope.questions) {
      $scope.questions.forEach(function(data) {
        if (data['answer']!=null&&data['answer']!=""&&data['answer']!=undefined) {
          $scope.completed_question++;
        }
      });
    }
  };

  $scope.save = function () {
    // $scope.data['1date'] = moment($scope.data['1date']).format('YYYY-MM-DD');
    var data = {
      'student_id':$scope.currentUser.id+"",
      'class_id':$scope.class_id,
      'experiment_id':$scope.exp_id,
      'report':$scope.new_data
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
            ExperimentFactory.userReport().post({id: $scope.exp_id}, record).$promise.then(function(response){
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

  // $http.get("tpl/app/report/lashen.json")
  //    .success(function(data){
  //     $scope.new_data = data;
  //     $scope.question_change();
  //    });

}]);
