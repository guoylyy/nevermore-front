app.controller("ModifyExperimentCtrl", ["$scope", "data", "Exp",
function($scope, data, Exp){
	var originResource = data
	,	copiedResource = angular.copy(originResource)
	var activeManager = new ActiveManager()

	$scope.resource = copiedResource
	$scope.activeList = activeManager.getActiveList()
	$scope.pending = false
	$scope.modifyResource = modifyResource
	$scope.deleteResource = deleteResource
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
		return Exp.fid().put({
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
		return Exp.fid().delete({
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