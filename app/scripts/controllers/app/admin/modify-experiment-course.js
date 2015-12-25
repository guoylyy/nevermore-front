app.controller("ModifyExperimentCourseCtrl", ["$scope", "data", "Course",
function($scope, data, Course){
	var originResource = data
	,	copiedResource = angular.copy(originResource)
	var activeManager = new ActiveManager()
	$scope.resource = copiedResource
	$scope.pending = false
	$scope.modifyResource = modifyResource
	$scope.deleteResource = deleteResource
	$scope.activeList = activeManager.getActiveList()
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

	function modifyResource(){
		if(resourceComplete()){
			commitModify().$promise
			.then(removeErrorTip)
			.then(updateLocalResource)
			.then(function(){
				$scope.closeThisDialog("modify")
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

	function commitModify(){
		$scope.pending = true
		return Course.fid().put({
			"id": copiedResource.id,
		}, copiedResource)
	}

	function updateLocalResource(data){
		angular.copy(copiedResource, originResource)
	}

	function deleteResource(){
		commitDelete().$promise
		.then(function(){
			$scope.closeThisDialog("delete")
		})
		.catch(errorHandler)
	}

	function commitDelete(){
		$scope.pending = true
		return Course.fid().delete({
			"id": copiedResource.id,
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