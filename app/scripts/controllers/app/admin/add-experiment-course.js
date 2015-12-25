app.controller("AddExperimentCourseCtrl", ["$scope", "Course",
function($scope, Course){
	var DEFAULT_ACCOUNT = Course.template()

	var activeManager = new ActiveManager()
	var adding = false
	var resource = angular.copy(DEFAULT_ACCOUNT)

	$scope.resource = resource
	$scope.activeList = activeManager.getActiveList()
	$scope.addResource = addResource
	$scope.errorTip = ""


	

	//TODO: 这种manager抽象出来
	function ActiveManager(){
		var ACTIVE_LIST = [
			{
				"chinese": "开放",
				"bool": true,
			},
			{
				"chinese": "关闭",
				"bool": false,
			},
		]

		this.getActiveList = function(){
			return ACTIVE_LIST
		}
	}

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
		if($scope.resource.number === "" || $scope.resource.name === ""){
			return false
		}
		return true
	}

	function commitResource(){
		adding = true
		return Course.create().post(resource)
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