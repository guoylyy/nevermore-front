'use strict';

angular.module('nevermore')
  .factory('authInterceptor', function loadingHttpInterceptor($q, $timeout,
    $rootScope, $sessionStorage, $localStorage, $location) {

    var whiteList = [
      'tpl/portal',
      'tpl/ucenter',
      'reservation/semester/list/all'
    ];
    function checkToken(){
      if (!$localStorage.token  || !$localStorage.currentUser) {
				$location.path('/signin');
				return false;
			}else{
				$rootScope.currentUser = $localStorage.currentUser;
				$rootScope.token = $localStorage.token;
			}
    };
    function isNotInWithList(url) {
      console.log(url);
      for(var i = 0; i < whiteList.length; i++) {
        var regExp = new RegExp(whiteList[i]);
        if(regExp.test(url)) {
          return false;
        }
      }
      return true;
    }
    return {
      request: function (config) {
        if(config && isNotInWithList(config.url)){
            checkToken();
        }
        return config || $q.when(config);
      },
      requestError: function (config) {
        return $q.reject(rejection);
      },
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        return $q.reject(rejection);
      }
    };
  });
