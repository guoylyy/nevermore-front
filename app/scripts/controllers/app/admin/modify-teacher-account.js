app.controller("ModifyTeacherAccountCtrl", ["$scope", "data", "Account",
function($scope, data, Account){
	var originAccount = data
	,	copiedAccount = angular.copy(originAccount)
	var genderManager = new GenderManager()
	var roleManager = new RoleManager()
	$scope.account = copiedAccount
	$scope.pending = false
	$scope.modifyAccount = modifyAccount
	$scope.deleteAccount = deleteAccount
	$scope.genderList = genderManager.getGenderList()
	$scope.roleList = roleManager.getRoleList()
	$scope.errorTip = ""


	//TODO: 这种manager抽象出来
	function GenderManager(){
		var GENDER_LIST = [
			{
				"chinese": "男",
				"english": "MALE",
			},
			{
				"chinese": "女",
				"english": "FEMALE",
			},
		]

		this.getGenderList = function(){
			return GENDER_LIST
		}
	}

	function RoleManager(){
		var ROLE_LIST = [
			{
				"chinese": "课程和实验教师",
				"english": "ALL_TEACHER",
			},
			{
				"chinese": "课程教师",
				"english": "NOR_TEACHER",
			},
			{
				"chinese": "实验教师",
				"english": "LAB_TEACHER",
			},
		]

		this.getRoleList = function(){
			return ROLE_LIST
		}
	}

	function modifyAccount(){
		if(accountComplete()){
			commitModify().$promise
			.then(removeErrorTip)
			.then(updateLocalAccount)
			.then(function(){
				$scope.closeThisDialog("modify")
			})
			.catch(errorHandler)
		}else{
			errorHandler("请完整填写信息")
		}
	}

	function accountComplete(){
		if($scope.account.number === "" || $scope.account.name === ""){
			return false
		}
		return true
	}

	function commitModify(){
		$scope.pending = true
		return Account.account().put({
			"id": copiedAccount.id,
		}, copiedAccount)
	}

	function updateLocalAccount(data){
		angular.copy(copiedAccount, originAccount)
	}

	function deleteAccount(){
		commitDelete().$promise
		.then(function(){
			$scope.closeThisDialog("delete")
		})
		.catch(errorHandler)
	}

	function commitDelete(){
		$scope.pending = true
		return Account.account().delete({
			"id": copiedAccount.id,
		})
	}

	function removeErrorTip(data){
		$scope.errorTip = ""
		return data
	}

	function errorHandler(error){
		$scope.pending = false
		var errorMessage = getErrorMessage(error)
		showErrorTip(errorMessage)	
	}

	function getErrorMessage(error){
		if(typeof error === "object"){
			return error.errorCode || error.toString()
		}else{
			return error.toString()
		}
	}

	function showErrorTip(error){
		$scope.errorTip = error
	}
}])