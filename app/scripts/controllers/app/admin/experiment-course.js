'use strict'

app.controller("ExperimentCourseCtrl", ['$scope', 'Course', 'ToasterTool',
function($scope, Course, ToasterTool){
	$scope.resources = angular.copy($scope.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource

	$scope.loadResources(Course).then(loadSuccess, loadFail)

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		$scope.errorHandler(error)
	}

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-experiment-course.html"
		var controller = "ModifyExperimentCourseCtrl"
		var modifyDialog = new $scope.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller)
	}

	function onModify(){
		ToasterTool.success("编辑实验课程", "编辑实验课程成功！")
	}

	function onDelete(){
		$scope.loadResources(Course).then(loadSuccess, loadFail)
		ToasterTool.success("删除实验课程", "删除实验课程成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-experiment-course.html"
		var controller = "AddExperimentCourseCtrl"
		var addDialog = new $scope.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		$scope.loadResources(Course).then(loadSuccess, loadFail)
		ToasterTool.success("添加实验课程", "添加实验课程成功！")
	}
}])