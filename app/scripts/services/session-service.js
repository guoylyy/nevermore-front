'use strict';

//看了下这个文件，用的都是localstorage，改为localStorageService更合适吧。
//而且现在浏览器已经有了sessionStorage，再叫这个名字有点容易误解。
angular.module('nevermore').service('sessionService',
	function categoryService ($localStorage, $location,
		$rootScope, tokenFactory, qService,$state) {

		this.checkToken = function() {
			return checkLocalToken();
		};

		this.getCurrSemeter = function(){
			return gCurrSemester();
		};

		this.getCurrentUser = function(){
			if($localStorage.currentUser){
				$rootScope.currentUser = $localStorage.currentUser;
				return $localStorage.currentUser;
			}else{
				return null;
			}
		};

		this.saveCurrentUser = function(currentUser){
			$localStorage.currentUser = currentUser;
			$rootScope.currentUser = currentUser;
		};

		this.saveToken = function(token) {
			$localStorage.token = token;
			$rootScope.token = token;
		};

		this.storageChecking = function(){
			checkLocalToken();
		};

		//get对应的save
		//semester还拼错
		this.saveCurrSemeter = function(semester){
			$localStorage.semester = semester;
			$rootScope.semester = semester;
		};

		//这和session有一毛钱关系。。。
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

		this.delToken = function() {
			delete $localStorage.currentUser;
			delete $localStorage.token;
			delete $rootScope.currentUser;
			delete $rootScope.token;
			delete $localStorage.semester;
			delete $rootScope.semester;
			delete $localStorage.report;
			delete $localStorage.isAutoLogin
			$state.go('portal.login');
		};

		this.headers = function(){
			return {
      			'x-auth-token': $localStorage.token
    		};
		};
	}
);
