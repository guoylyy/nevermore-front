app.controller("AddSemesterCtrl", ["$scope", "Semester",
function($scope, Semester){
	var DEFAULT_ACCOUNT = {
		name: "",
		startDate: new Date(),
		endDate: new Date(),
	}

	var adding = false
	var resource = angular.copy(DEFAULT_ACCOUNT)

	$scope.resource = resource
	$scope.addResource = addResource
	$scope.errorTip = ""

	function addResource(){
		if(resourceComplete()){
			commitResource().$promise
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

	function resourceComplete(){
		if($scope.resource.name === ""){
			return false
		}
		return true
	}

	function commitResource(){
		adding = true
		return Semester.create().post($scope.resource)
	}

	function removeErrorTip(data){
		$scope.errorTip = ""
		return data
	}

	function resourceValid(data){
		var RIGHT_CODE = "NO_ERROR"
		if(data.errorCode === RIGHT_CODE){
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
