'use strict'

app.controller("StudentAccountCtrl", ['$scope', 'Account', 'ngDialog',
				'generalService', 'ToasterTool',
function($scope, Account, ngDialog, generalService, ToasterTool){
	var DEFAULT_ACCOUNTS = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}

	$scope.accounts = angular.copy(DEFAULT_ACCOUNTS)

	$scope.modifyAccount = modifyAccount
	$scope.modifyPassword = modifyPassword
	$scope.addAccount = addAccount
	$scope.pageChanged = loadAccounts
	$scope.onTransit = function(lastAction, nowAction, searchWord){
		if(lastAction === "searching" && nowAction === "searched"){
			searchAccount(searchWord)
		}else if(lastAction === "searched" && nowAction === "searched"){
			searchAccount(searchWord)
		}else if(lastAction === "searched" && nowAction === "listing"){
			$scope.accounts.curPageNum = 1
			loadAccounts()
		}
	}
	
	loadAccounts()



	function loadAccounts(){
		Account.page().get({
			"pageSize": generalService.pageSize(),
			"pageNumber": $scope.accounts.curPageNum,
			"userType": "STUDENT",
		}, function(data){
			angular.copy(data, $scope.accounts)
		}, function(error){
			errorHandler(error)
		})
	}

	function modifyAccount(account){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/modify-student-account.html",
			"controller": "ModifyStudentAccountCtrl",
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
				loadAccounts()
				ToasterTool.success("编辑学生", "删除学生成功！")
			}else if(data.value === MODIFY_ACTION){
				ToasterTool.success("编辑需核实呢过", "编辑学生成功！")
			}
		})
	}

	function modifyPassword(account){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/modify-student-password.html",
			"controller": "ModifyStudentPasswordCtrl",
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
			"template": "tpl/app/admin/modal/add-student-account.html",
			"controller": "AddStudentAccountCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
		})
		accountDialog.closePromise.then(function(data){
			if(!!data.value.account){
				loadAccounts()
				ToasterTool.success("添加学生", "添加学生成功！")
			}
		})
	}

	function searchAccount(searchWord){
		commitSearch(searchWord).$promise
		.then(updateAccountsAfterSearch)
		.catch(errorHandler)
	}

	function commitSearch(searchWord){
		return Account.search().get({
			"userType": "STUDENT",
			"value": searchWord,
		})
	}

	function updateAccountsAfterSearch(data){
		angular.copy(data, $scope.accounts)
	}

	function errorHandler(error){
		console.log(error)
	}
}])