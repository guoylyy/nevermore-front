'use strict';

angular.module('nevermore').service('qService',
	function categoryService($localStorage, $location, $rootScope,
		tokenFactory, $q, ToasterTool) {


		function successHandler(deferred, data){
			if (data.errorCode == "NO_ERROR") {
				deferred.resolve(JSOG.parse(JSOG.stringify(data)));
			}else {
				//$('.modal-backdrop').remove();
				deferred.resolve(JSOG.parse(JSOG.stringify(data)));
				//modalService.signleConfirmInform("服务器开了小差","访问出现错误",'warning',function(){});
			};
		};
		function errorHandler(deferred, data){
			deferred.resolve(data);
			var title = "";
			var subTile = "访问出现错误";
			if (data.data.errorCode == 'FORBIDDEN') {
				title = "好像您的权限不足以访问这个资源！"
			} else {
				title = "服务器开了小差!"
			};
			ToasterTool.error(subTile,title);
		};

		this.tokenHttpGet = function(resourceObject, paramObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).get(paramObject,
				function success(data) {
					successHandler(deferred, data);
				},
				function error(data) {
					errorHandler(deferred, data);
				});
			return deferred.promise;
		};

		this.tokenHttpPost = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).post(paramObject, reqBodyObject,
				function success(data) {
					successHandler(deferred, data);
				},
				function error(data) {
					successHandler(deferred, data);
				});
			return deferred.promise;
		};

		this.tokenHttpPut = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).put(paramObject, reqBodyObject,
				function success(data) {
					successHandler(deferred, data);
				},
				function error(data) {
					errorHandler(deferred, data);
				});
			return deferred.promise;
		};

		this.tokenHttpDelete = function(resourceObject, paramObject, reqBodyObject) {
			var deferred = $q.defer();
			resourceObject({
				'x-auth-token': $localStorage.token
			}).delete(paramObject, reqBodyObject,
				function success(data) {
					successHandler(deferred, data);
				},
				function error(data) {
					errorHandler(deferred, data);
				});
			return deferred.promise;
		}
	}
);
