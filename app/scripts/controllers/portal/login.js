'use strict';

app.controller('LoginController', function($scope,$rootScope, $state, $localStorage, $http,
    $location,sessionService, tokenFactory, qService, Semester, ToasterTool) {

  if ($localStorage.token!=null) {
    if ($localStorage.currentUser.show_role == 'STUDENT') {
      $state.go('app.index.student-reservations',{title:'clazz'});
    }else if ($localStorage.currentUser.show_role == 'TEACHER') {
      $state.go('app.index.teacher-reservations',{title:'APPROVED'});
    }else if ($localStorage.currentUser.show_role == 'ADMINISTRATOR') {
      $state.go('app.account-admin.admin-account');
    }
    return;
  }

  $scope.accountCharacter = 'TEACHER';
  $scope.login_name = "";
  $scope.login_password = "";

  //登录方法
  $scope.login = function() {
    $scope.message = "";
    var _n = $scope.login_name;
    var _p = $scope.login_password;
    if (_n == undefined || _n == "" || _p == undefined || _p == "") {
      $scope.errorMsg = '用户名/密码不能为空!';
      return;
    }
    tokenFactory.login({
      'X-Username': _n,
      'X-Password': _p
    }).post({},
      function success(data, headers) {
        sessionService.saveToken(data.data, headers()['x-auth-token']);
        $http.get(base_Url+'/api/semester/current',
          {headers:{'x-auth-token':headers()['x-auth-token']}})
        .success(function(rc){
          sessionService.saveCurrSemeter(rc.data);
          if($rootScope.currentUser.show_role == 'ADMINISTRATOR'){
    				$state.go('app.account-admin.admin-account');
    			}else if($rootScope.currentUser.show_role == 'TEACHER'){
    				$state.go('app.index.teacher-reservations',{title:'APPROVED'});
    			}else if($rootScope.currentUser.show_role == 'STUDENT'){
    				$state.go('app.index.student-reservations',{title:'clazz'});
    			}
          ToasterTool.success('登录成功','欢迎回到航力云平台!');
        }).error(function(error){
          ToasterTool.error('未知错误发生!','');
        });
      },
      function error(data) {
        ToasterTool.error('登录失败','用户名或密码错误');
      });
  };

  $scope.forgotPassword = function(){
    ToasterTool.info('请联系管理员','联系电话: 021-65982267 力学实验中心');
  };

});
