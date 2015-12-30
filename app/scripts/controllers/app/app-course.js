'use strict';

app.controller('AppCourseController', function($rootScope, $scope, Clazz, qService,
   $state) {

  //当前角色为老师的情况
  if ($rootScope.currentUser.show_role=='TEACHER') {

    $scope.classes = [];//班级信息

    qService.tokenHttpGet(Clazz.clazzByTeacher,{
    }).then(function(rc){
      var classes = rc;
      for(var i = 0 ; i < classes.data.length; i++){
          var entity = {
              'id': classes.data[i].id,
              'number': classes.data[i].number,
              'course': classes.data[i].course,
              'active':false
          };
          $scope.classes.push(entity);
          if($scope.classes.length != 0){
            $state.go('app.course.teacher-class',{'id':$scope.classes[0].id});
          }
      }

      // $scope.$broadcast("classchange",0);
    });
  }
  //当前为学生的情况
  else if ($rootScope.currentUser.show_role=='STUDENT') {
    $scope.courses = [];//课程信息
    qService.tokenHttpGet(Clazz.clazzByStudent,{
    }).then(function(rc){
      var classes = rc;
      for (var i = 0; i < classes.data.length; i++) {
          var entity = {
              'id': classes.data[i].course.id,
              'coursename': classes.data[i].course.name,
              'classnumber': classes.data[i].number,
              'teacher': classes.data[i].teacher.name,
              'classId': classes.data[i].id,
              'active':false
          };
          $scope.courses.push(entity);
          if($scope.courses.length != 0){
            $state.go('app.course.student-class',{'id':$scope.courses[0].classId});
          }
      }

      // $scope.$broadcast("classchange",0);
    });
  }


});
