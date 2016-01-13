app.controller("ModifyClassCtrl", ["$scope", "Clazz", "data", "semester", "teacherResource", "courseResource",
function($scope, Clazz, data, semester, teacherResource, courseResource){
	var teacherList = []
	,	courseList = []

	if(teacherResource.errorCode === "NO_ERROR"){
		teacherList = teacherResource.data
	}

	if(courseResource.errorCode === "NO_ERROR"){
		courseList = courseResource.data
	}

	var originResource = data
	,	copiedResource = angular.copy(originResource)

	$scope.resource = copiedResource
	$scope.pending = false
	$scope.modifyResource = modifyResource
	$scope.deleteResource = deleteResource
	$scope.errorTip = ""
	$scope.teacherList = teacherList
	$scope.courseList = courseList

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
		if($scope.resource.number === ""){
			return false
		}
		return true
	}

	function commitModify(){
		$scope.pending = true
		return Clazz.clazz().put({
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
		return Clazz.clazz().delete({
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
