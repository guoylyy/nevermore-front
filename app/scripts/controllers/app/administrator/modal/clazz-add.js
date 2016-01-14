app.controller("AddClassCtrl", ["$scope", "ClazzManage", "semester", "teacherResource", "courseResource",
function($scope, ClazzManage, semester, teacherResource, courseResource){
	var DEFAULT_RESOURCE = {
		number: "",
		teacher: undefined,
		course: undefined,
		semester: undefined,
		clazzHour: "",
		clazzroom: "",
		description: "",
	}

	var teacherList = []
	,	courseList = []

	if(teacherResource.success){
		teacherList = teacherResource.data
	}

	if(courseResource.success){
		courseList = courseResource.data
	}

	var adding = false
	var resource = angular.copy(DEFAULT_RESOURCE)
	resource.semester = semester

	$scope.resource = resource
	$scope.teacherList = teacherList
	$scope.courseList = courseList
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
		if($scope.resource.number === ""){
			return false
		}
		return true
	}

	function commitResource(){
		adding = true
		var resourceToCommit = angular.copy($scope.resource)
		resourceToCommit['teacherId'] = resourceToCommit.teacher.id;
		resourceToCommit['courseId'] = resourceToCommit.course.id;
		resourceToCommit['semesterId'] = 23;
		delete resourceToCommit['teacher'];
		delete resourceToCommit['course'];
		delete resourceToCommit['semester'];
		return ClazzManage.create().post({
		}, resourceToCommit)
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
