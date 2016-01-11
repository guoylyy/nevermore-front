;(function(){
  'use strict';

  app.controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ["$scope", "$rootScope", "$state",
   "sessionService", "tokenFactory", "Semester", "ToasterTool"]

  function LoginCtrl($scope, $rootScope, $state,
   sessionService, tokenFactory, Semester, ToasterTool){
    $scope.accountCharacter = 'TEACHER'
    $scope.loginName = ""
    $scope.loginPassword = ""
    $scope.login = login
    $scope.forgotPassword = forgotPassword


    function login() {
      var name = $scope.loginName;
      var password = $scope.loginPassword;
      if (name === undefined || name === "" || password === undefined || password === "") {
        ToasterTool.error('用户名/密码不能为空!');
        return;
      }

      tokenFactory.login({
        'X-Username': name,
        'X-Password': password
      }).post({}, loginSuccess,

        //这里还是建议后端功能稍微强一点，能分辨出是用户名不存在还是密码错误。
        //最近用优酷被这个问题弄的很蛋疼。。。
        loginError);

      function loginSuccess(data, headers){
        sessionService.saveToken(data.data, headers()['x-auth-token']);

        Semester.current().get().$promise
        .then(function(rc){
          sessionService.saveCurrSemeter(rc.data);
          transitStateByRole($rootScope.currentUser.show_role)
          ToasterTool.success('登录成功','欢迎回到航力云平台!');
        })
        .catch(function(error){
          ToasterTool.error('未知错误发生!','');
        });



        function transitStateByRole(role){
          if(role == 'ADMINISTRATOR'){
            $state.go('app.account-admin.admin-account');
          }else if(role == 'TEACHER'){
            $state.go('app.index.teacher-reservations',{title:'APPROVED'});
          }else if(role == 'STUDENT'){
            $state.go('app.index.student-reservations',{title:'clazz'});
          }else{
            ToasterTool.error('未知错误发生!','');
          }
        }
      }

      function loginError(error){
        ToasterTool.error('登录失败','用户名或密码错误');
      }
    };

    function forgotPassword(){
      ToasterTool.info('请联系管理员','联系电话: 021-65982267 力学实验中心');
    };
  }
})()

