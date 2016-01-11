;void function(){

	'use strict'

	app.controller("AdminAccountCtrl", AdminAccountCtrl)

	AdminAccountCtrl.$inject = ['$scope', 'Account', 'ngDialog', 
		'generalService', "ErrorHandler", "ToasterTool"]

	function AdminAccountCtrl($scope, Account, ngDialog, 
		generalService, ErrorHandler, ToasterTool){

		var DEFAULT_ACCOUNTS = generalService.getDefaultDataTemplate()

		$scope.accounts = angular.copy(DEFAULT_ACCOUNTS)

		$scope.modifyAccount = modifyAccount
		$scope.deleteAccount = deleteAccount
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


		function deleteAccount(){
			commitDelete().$promise
			.then(function(){
				$scope.closeThisDialog("delete")
			})
			.catch(errorHandler)
		}

		function commitDelete(){
			$scope.pending = true
			return Resource.Resource().delete({
				"id": copiedResource.id,
			})
		}


		function loadAccounts(){
			Account.page().get({
				"pageSize": generalService.pageSize(),
				"pageNumber": $scope.accounts.curPageNum,
				"userType": "ADMINISTRATOR",
			}, function(data){
				angular.copy(data, $scope.accounts)
			}, function(error){
				errorHandler(error)
			})
		}

		function modifyAccount(account){
			var accountDialog = ngDialog.open({
				"template": "tpl/app/admin/modal/modify-admin-account.html",
				"controller": "ModifyResourceCtrl",
				"closeByDocument": true,
				"closeByEscape": true,
				"resolve": {
					"data": function(){
						return account
					},
					"commitModify": function(){
						return function commitModify(resource){
							return Account.account().put({
								"id": resource.id,
							}, resource).$promise
						}
					}
				},
			})
			accountDialog.closePromise.then(function(data){
				if(data.value === "success"){
					loadAccounts()
					ToasterTool.success("编辑管理员", "编辑管理员成功！")
				}
			})
		}

		function modifyPassword(account){
			var accountDialog = ngDialog.open({
				"template": "tpl/app/admin/modal/modify-admin-password.html",
				"controller": "ModifyAdminPasswordCtrl",
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
				"template": "tpl/app/admin/modal/add-admin-account.html",
				"controller": "AddAdminAccountCtrl",
				"closeByDocument": true,
				"closeByEscape": true,
			})
			accountDialog.closePromise.then(function(data){
				if(!!data.value.account){
					loadAccounts()
					ToasterTool.success("添加管理员", "添加管理员成功！")
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
				"userType": "ADMINISTRATOR",
				"value": searchWord,
			})
		}

		function updateAccountsAfterSearch(data){
			angular.copy(data, $scope.accounts)
		}

		function errorHandler(error){
			ErrorHandler.handle(error)
		}
	}

}()