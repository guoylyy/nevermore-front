'use strict';


angular.module('nevermore')
  .filter('adminRoleFilter', function () {
    return function (user) {
      if(user.role == 'ADMINISTRATOR'){
        return 'true';
      }else{
        return 'false';
      }
    };
  })
  .filter('teacherRoleFilter', function () {
    return function (user) {
      if(user.role != 'ADMINISTRATOR' && user.role!='TEACHER'){
        return true;
      }else{
        return false;
      }
    };
  })
  .filter('genderFilter', function(){
    return function(gender){
      if(gender == 'MALE'){
        return '男';
      }else if(gender == 'FEMALE'){
        return '女';
      }
    };
  })
  .filter('studentRoleFilter', function () {
    return function (user) {
      if(user.role == 'STUDENT'){
        return true;
      }else{
        return false;
      }
    };
  })
  .filter('role', function(){
    return function(role){
      var role;
      switch(role){
        case 'ADMINISTRATOR':
          role = '管理员';
          break;
        case 'LAB_TEACHER':
          role = '实验教师';
          break;
        case 'NOR_TEACHER':
          role = '课程教师';
          break;
        case 'ALL_TEACHER':
          role = '实验和课程教师';
          break;
        case 'STUDENT':
          role = '学生';
          break;
        default:
          role = role;
      };
      return role;
    };
  })
  ;
