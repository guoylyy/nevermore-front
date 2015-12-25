'use strict';
//
app.controller('ReportCtrl',  function($scope, $state, $rootScope, AlertTool, $stateParams, Report, qService, ToasterTool, StudentRecord, Clazz) {

  $scope.report_step = 1;

  $scope.exp_id = $stateParams.expId;

  $scope.class_id = $stateParams.classId;

  $scope.completed_question = 0;

  qService.tokenHttpGet(Report.report, {
    stuId: $rootScope.currentUser.id+"",
    classId: $scope.class_id,
    expId: $scope.exp_id
  }).then(function(rc){
    if (rc.code == 200) {
      $scope.data = rc.data.report;
      $scope.status = rc.data.status;
      $scope.data.student.name = $rootScope.currentUser.name;
      qService.tokenHttpGet(Clazz.clazz, {
        id: $scope.class_id
      }).then(function(rc){
        $scope.data.student.class = rc.data.clazz.course.name+" "+rc.data.clazz.course.number;
      });
      $scope.data['1date'] = new Date();
      $scope.question_change();
    }
    else {
      qService.tokenHttpGet(Report.template, {
        expId: "1"
      }).then(function(rc){
        $scope.data = rc.data;
        $scope.status = rc.data.status;
        $scope.data.student.name = $rootScope.currentUser.name;
        qService.tokenHttpGet(Clazz.clazz, {
          id: $scope.class_id
        }).then(function(rc){
          $scope.data.student.class = rc.data.course.name+" "+rc.data.course.number;
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
      'student_id':$rootScope.currentUser.id+"",
      'class_id':$scope.class_id,
      'experiment_id':$scope.exp_id,
      'report':$scope.data
    }
    qService.tokenHttpPost(Report.save, {}, data).then(function(rc) {
      if (rc.code == 200) {
        AlertTool.success({title:'保存成功！',text:''}).then(function() {
          $scope.status = 'uncommitted';
        });
      }else {
        AlertTool.error({title:'保存失败！',text:''}).then(function() {
        });
      }
    });
  }

  $scope.submit = function (){
    qService.tokenHttpPost(Report.report, {
      stuId: $rootScope.currentUser.id+"",
      classId: $scope.class_id,
      expId: $scope.exp_id
    }).then(function(rc) {
      if (rc.code == 200) {
        AlertTool.success({title:'提交成功！',text:''}).then(function() {
          $scope.status = 'committed';
          $state.go('app.course.report-result',{expId:$scope.exp_id,classId:$scope.class_id,stuId:$rootScope.currentUser.id});
          var record = {
            "experimentRecord": 66
          };
          qService.tokenHttpGet(StudentRecord.studentRecord, {
            student: $rootScope.currentUser.id,
            clazz: $scope.class_id,
            experiment: $scope.exp_id
          }).then(function(rc){
            qService.tokenHttpPut(StudentRecord.update, {id:rc.data.id} , record).then(function(result) {

            });
          });
        });
      }else if (rc.code == 110) {
        AlertTool.error({title:'提交失败！',text:rc.data}).then(function() {
        });
      }else{
        AlertTool.error({title:'提交失败！',text:''}).then(function() {
        });
      }
    });
  }

});
