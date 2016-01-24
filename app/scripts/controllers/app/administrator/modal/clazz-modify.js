app.controller("ModifyClassCtrl", ["$scope", "ClazzManage", "data", "semester", "teacherResource", "courseResource",
function($scope, ClazzManage, data, semester, teacherResource, courseResource){
	var teacherList = []
	,	courseList = []

	if(teacherResource.success){
		teacherList = teacherResource.data
	}

	if(courseResource.success){
		courseList = courseResource.data
	}

	var originResource = data
	,	copiedResource = angular.copy(originResource)

	$scope.semester = semester
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
		var submitResource = angular.copy(copiedResource);
		submitResource['teacherId'] = submitResource.teacher.id;
		submitResource['courseId'] = submitResource.course.id;
		submitResource['semesterId'] = 23;
		return ClazzManage.clazz().put({
			"id": copiedResource.id,
		}, submitResource)
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
		return ClazzManage.clazz().delete({
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
