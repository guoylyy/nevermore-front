angular.module('nevermore')
  .service('SystemService', ['$localStorage', 'ResTool', '$sessionStorage', '$location',  function (
     $localStorage, ResTool, $sessionStorage, $location) {
      var TOKEN_KEY = 'X-Auth-Token',
        TOKEN_HEADER = 'x-auth-token',
        LOGIN_USER = 'Login-User',
        USERNAME = 'UserName',
        PASSWORD = 'Password';

      //判断用户是否已经login了
      this.isLogin = function(){
          //console.log($localStorage[TOKEN_KEY]);
          if($localStorage[TOKEN_KEY]){
            if($localStorage[LOGIN_USER]){
              //console.log("已经登录的用户");
              $sessionStorage[TOKEN_KEY] = $localStorage[TOKEN_KEY];
              $sessionStorage[LOGIN_USER] = $localStorage[LOGIN_USER];
              return true;
            }
            return false;
          }else{
            return false;
          }
      };

      //重新登录，设置token和当前用户
      this.login = function(user, token){
        $localStorage[TOKEN_KEY] = $sessionStorage[TOKEN_KEY] = token;
        $localStorage[LOGIN_USER] = $sessionStorage[LOGIN_USER] = user;
        //console.log($localStorage[TOKEN_KEY]);
        //console.log($sessionStorage[TOKEN_KEY]);
      }

      //登出
      this.logout = function(){
        delete $localStorage[TOKEN_KEY];
        delete $localStorage[LOGIN_USER];
        delete $sessionStorage[TOKEN_KEY];
        delete $sessionStorage[LOGIN_USER];
        delete $localStorage[USERNAME];
        delete $localStorage[PASSWORD];
      };

      this.getLoginUser = function(){
        return $sessionStorage[LOGIN_USER];
      };

      this.updateLoginUser = function(user){
        $localStorage[LOGIN_USER] = $sessionStorage[LOGIN_USER] = user;
      };

      this.saveLoginInfo = function(username, password) {
        $localStorage[USERNAME] = username;
        $localStorage[PASSWORD] = password;
      };

      this.loadLoginInfo = function() {
        return {
          username: $localStorage[USERNAME],
          password: $localStorage[PASSWORD]
        };
      };
  }]);
