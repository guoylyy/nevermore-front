'use strict';

angular.module('nevermore').service('sessionService',
	function categoryService ($localStorage, $location,
		$rootScope, tokenFactory, qService,$state) {

		function gCurrSemester(){
			if($localStorage.semester){
				$rootScope.semester = $localStorage.semester;
				return $localStorage.semester;
			}else{
				return null;
			}
		};

		function checkLocalToken(){
			//这边比较token用$localstorage,因为$rootScope一刷新页面就清空了
			if (!$localStorage.token  || !$localStorage.currentUser) {
				$state.go('portal.login');
				return false;
			}else{
				$rootScope.currentUser = $localStorage.currentUser;
				$rootScope.token = $localStorage.token;
			}
		};

		this.checkToken = function() {
			return checkLocalToken();
		};

		this.getCurrSemeter = function(){
			return gCurrSemester();
		};

		this.getCurrUser = function(){
			if($localStorage.currentUser){
				$rootScope.currentUser = $localStorage.currentUser;
				return $localStorage.currentUser;
			}else{
				return null;
			}
		};

		this.saveCurrUser = function(currentUser){
			$localStorage.currentUser = currentUser;
			$rootScope.currentUser = currentUser;
		};

		this.storageChecking = function(){
			 checkLocalToken();
			 checkLocalToken();
		};

		this.saveCurrSemeter = function(semester){
			$localStorage.semester = semester;
			$rootScope.semester = semester;
		};

		this.saveToken = function(user, token) {
			var user = wrapperUser(user);
			$localStorage.currentUser = user;
			$localStorage.token = token;
			$rootScope.currentUser = user;
			$rootScope.token = token;
		};


		function wrapperUser(user){
			if(user.role == 'STUDENT' || user.role =='ADMINISTRATOR'){
				user.show_role = user.role;
			}else{
				user.show_role = 'TEACHER';
			}
			return user;
		};

		this.delToken = function() {
			delete $localStorage.currentUser;
			delete $localStorage.token;
			delete $rootScope.currentUser;
			delete $rootScope.token;
			delete $localStorage.semester;
			delete $rootScope.semester;
			$state.go('portal.login');
		};
		this.headers = function(){
			return {
      	'x-auth-token': $localStorage.token
    	};
		};
	}
);
