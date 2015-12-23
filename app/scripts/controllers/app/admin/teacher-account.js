'use strict'

app.controller("TeacherAccountCtrl", ['$scope', 'Account', 'ngDialog',
				'generalService', 'ToasterTool',
function($scope, Account, ngDialog, generalService, ToasterTool){
	var DEFAULT_ACCOUNTS = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}
	var actionBarManager = new ActionBarManager()
	actionBarManager.setTransitListener(function(lastAction, nowAction){
		if(lastAction === "searching" && nowAction === "searched"){
			searchAccount()
		}else if(lastAction === "searched" && nowAction === "searched"){
			searchAccount()
		}else if(lastAction === "searched" && nowAction === "listing"){
			$scope.accounts.curPageNum = 1
			loadAccounts()
		}
	})

	$scope.accounts = angular.copy(DEFAULT_ACCOUNTS)

	$scope.modifyAccount = modifyAccount
	$scope.modifyPassword = modifyPassword
	$scope.addAccount = addAccount
	$scope.pageChanged = loadAccounts
	$scope.isSearching = actionBarManager.isSearching
	$scope.isListing = actionBarManager.isListing
	$scope.isSearched = actionBarManager.isSearched
	$scope.listing = actionBarManager.listing
	$scope.searching = actionBarManager.searching
	$scope.searched = actionBarManager.searched
	
	loadAccounts()


	app.filter("genderFilter", function(gender){
		if(gender === "MALE"){
			return "男"
		}else if(gender === "FEMALE"){
			return "女"
		}else{
			return "未知"
		}
	})



	function loadAccounts(){
		Account.page().get({
			"pageSize": generalService.pageSize(),
			"pageNumber": $scope.accounts.curPageNum,
			"userType": "ALL_TEACHER",
		}, function(data){
			angular.copy(data, $scope.accounts)
		}, function(error){
			errorHandler(error)
		})
	}

	function modifyAccount(account){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/modify-teacher-account.html",
			"controller": "ModifyTeacherAccountCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				"data": function(){
					return account
				},
			},
		})
		accountDialog.closePromise.then(function(data){
			var DELETE_ACTION = "delete"
			var MODIFY_ACTION = "modify"
			if(data.value === DELETE_ACTION){
				actionBarManager.listing()
				loadAccounts()
				ToasterTool.success("编辑教师", "删除教师成功！")
			}else if(data.value === MODIFY_ACTION){
				ToasterTool.success("编辑教师", "编辑教师成功！")
			}
		})
	}

	function modifyPassword(account){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/modify-teacher-password.html",
			"controller": "ModifyTeacherPasswordCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				"data": function(){
					return account
				},
			},
		})
		accountDialog.closePromise.then(function(data){
			var modifySuccess = data.value
			var SUCCESS = "MODIFY_SUCCESS"
			if(modifySuccess === SUCCESS){
				ToasterTool.success("修改密码", "密码修改成功！")
			}
		})
	}

	function addAccount(){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/add-teacher-account.html",
			"controller": "AddTeacherAccountCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
		})
		accountDialog.closePromise.then(function(data){
			if(!!data.value.account){
				loadAccounts()
				ToasterTool.success("添加教师", "添加教师成功！")
			}
		})
	}

	function searchAccount(){
		commitSearch().$promise
		.then(updateAccountsAfterSearch)
		.catch(errorHandler)
	}

	function commitSearch(){
		return Account.search().get({
			"userType": "ALL_TEACHER",
			"value": $scope.searchWord,
		})
	}

	function updateAccountsAfterSearch(data){
		angular.copy(data, $scope.accounts)
	}

	function errorHandler(error){
		console.log(error)
	}

	function ActionBarManager(){
		var ACTIONS_MAP = {
			"listing": 0,
			"searching": 1,
			"searched": 2
		}
		var nowAction = "listing"
		,	lastAction = "listing"

		var transitListener = undefined
		this.setTransitListener = function(callback){
			if(typeof callback === "function"){
				transitListener = callback
			}
		}

		this.isListing = function(){
			return nowAction === "listing"
		}

		this.isSearching = function(){
			return nowAction === "searching"
		}

		this.isSearched = function(){
			return nowAction === "searched"
		}

		//3个基本状态转移函数。
		//通过状态转移函数，改变变量，改变外观。
		this.listing = function(expectedNowAction){
			var newAction = "listing"
			actionTransitTo(newAction, expectedNowAction)
			
		}

		this.searching = function(expectedNowAction){
			var newAction = "searching"
			actionTransitTo(newAction, expectedNowAction)
		}

		this.searched = function(expectedNowAction){
			var newAction = "searched"
			actionTransitTo(newAction, expectedNowAction)
		}

		function actionTransitTo(newAction, expectedNowAction){
			if(canTransitTo(newAction, expectedNowAction)){
				transit(newAction)
			}
		}

		function canTransitTo(newAction, expectedNowAction){
			if(!!expectedNowAction && expectedNowAction !== nowAction){
				return false
			}
			return true
		}

		function transit(newAction){
			lastAction = nowAction
			nowAction = newAction
			typeof transitListener === "function" && transitListener(lastAction, nowAction)
		}
	}
}])