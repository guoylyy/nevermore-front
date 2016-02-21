app.controller("AddSemesterController", ["$scope", "SemesterFactory", "DateTool",
function($scope, SemesterFactory, DateTool){
	var DEFAULT_ACCOUNT = {
		title: "",
		startDate: new Date(),
		endDate: new Date(),
		description: null
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
		var postResouce = angular.copy($scope.resource);
		postResouce.startDate = DateTool.format(postResouce.startDate);
		postResouce.endDate = DateTool.format(postResouce.endDate);
		return SemesterFactory.create().post(postResouce)
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
