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

	if(teacherResource.errorCode === "NO_ERROR"){
		teacherList = teacherResource.data
	}

	if(courseResource.errorCode === "NO_ERROR"){
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
		delete resourceToCommit.teacher["@id"]
		delete resourceToCommit.semester["@id"]
		delete resourceToCommit.course["@id"]
		return ClazzManage.create().post({
			course: resourceToCommit.course.id,
			teacher: resourceToCommit.teacher.id,
			semester: resourceToCommit.semester.id,
		}, resourceToCommit)
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
