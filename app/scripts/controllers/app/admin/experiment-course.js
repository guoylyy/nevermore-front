'use strict'

app.controller("ExperimentCourseCtrl", ['$scope', 'Course', 'ngDialog',
				'generalService', 'ToasterTool',
function($scope, Course, ngDialog, generalService, ToasterTool){
	var DEFAULT_ACCOUNTS = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}

	$scope.resources = angular.copy(DEFAULT_ACCOUNTS)

	$scope.modifyResource = modifyResource
	$scope.addResource = addResource

	loadResources()


	function loadResources(){
		Course.all().get(function(data){
			angular.copy(data, $scope.resources)
		}, function(error){
			errorHandler(error)
		})
	}

	function modifyResource(resource){
		var accountDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/modify-experiment-course.html",
			"controller": "ModifyExperimentCourseCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				"data": function(){
					return resource
				},
			},
		})
		accountDialog.closePromise.then(function(data){
			var DELETE_ACTION = "delete"
			var MODIFY_ACTION = "modify"
			if(data.value === DELETE_ACTION){
				loadResources()
				ToasterTool.success("编辑实验课程", "删除实验课程成功！")
			}else if(data.value === MODIFY_ACTION){
				ToasterTool.success("编辑实验课程", "编辑实验课程成功！")
			}
		})
	}

	function addResource(){
		var resourceDialog = ngDialog.open({
			"template": "tpl/app/admin/modal/add-experiment-course.html",
			"controller": "AddExperimentCourseCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
		})
		resourceDialog.closePromise.then(function(data){
			if(!!data.value.resource){
				loadResources()
				ToasterTool.success("添加实验课程", "添加实验课程成功！")
			}
		})
	}

	function errorHandler(error){
		console.log(error)
	}
}])