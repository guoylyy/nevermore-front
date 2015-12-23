app.controller("ModifyTeacherPasswordCtrl", ["$scope", "data", "Account",
function($scope, data, Account){
	var account = data
	$scope.pending = false
	$scope.modifyPassword = modifyPassword
	$scope.errorTip = ""
	$scope.password = ""
	$scope.passwordConfirm = ""


	function modifyPassword(){
		if(passwordComplete()){
			commitModify().$promise
			.then(removeErrorTip)
			.then(checkModifyResult)
			.then(function(){
				$scope.closeThisDialog("MODIFY_SUCCESS")
			})
			.catch(errorHandler)
		}else{
			errorHandler("请完整填写密码")
		}
	}

	function passwordComplete(){
		if($scope.password === "" || $scope.passwordConfirm === ""){
			return false
		}
		if($scope.password !== $scope.passwordConfirm){
			return false
		}
		return true
	}

	function commitModify(){
		$scope.pending = true
		return Account.passwordByAdmin().put({
			"id": account.id,
			"newPassword": $scope.password,
		})
	}

	function removeErrorTip(data){
		$scope.errorTip = ""
		return data
	}

	function checkModifyResult(data){
		if(!data.data){
			throw new Error("密码修改失败")
		}
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