app.controller("AddTeacherAccountCtrl", ["$scope", "AccountManage","ManagementService",
function($scope, AccountManage, ManagementService){
	$scope.genderList =[
  		{
  			"value": "男",
  			"code": "MALE",
  		},
  		{
  			"value": "女",
  			"code": "FEMALE",
  		},
	];

	$scope.addTeacher = addTeacher

	var adding = false

	function addTeacher(){
		if(accountComplete()){
			commitAccount().$promise
			.then(removeErrorTip)
			.then(resourceValid)
			.then(function(data){
				$scope.closeThisDialog({
					resource: data.data
				})
			})
			.catch(errorHandler)
		}else{
			errorHandler("请完整填写信息")
		}
	}
	function accountComplete(){
		//TODO:校验输入
		return true;
	}
	function commitAccount(){
		adding = true
		var postResouce = angular.copy($scope.resource)
		postResouce.role = "TEACHER"
		return AccountManage.create().post(postResouce)
	}

	function removeErrorTip(data){
		$scope.errorTip = ""
		return data
	}
	function resourceValid(data){
		if(data.success){
			return data
		}else{
			throw new Error(data)
		}
	}
	function errorHandler(error){
		adding = false
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
