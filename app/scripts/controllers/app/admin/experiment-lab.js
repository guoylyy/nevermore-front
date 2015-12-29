'use strict'

app.controller("ExperimentLabCtrl", ['$scope', 'Lab', 'ToasterTool',
function($scope, Lab, ToasterTool){
	$scope.resources = angular.copy($scope.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource

	$scope.loadResources(Lab).then(loadSuccess, loadFail)

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		$scope.errorHandler(error)
	}

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-experiment-lab.html"
		var controller = "ModifyExperimentLabCtrl"
		var modifyDialog = new $scope.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller)
	}

	function onModify(){
		ToasterTool.success("编辑实验室", "编辑实验室成功！")
	}

	function onDelete(){
		$scope.loadResources(Lab).then(loadSuccess, loadFail)
		ToasterTool.success("删除实验室", "删除实验室成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-experiment-lab.html"
		var controller = "AddExperimentLabCtrl"
		var addDialog = new $scope.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		$scope.loadResources(Lab).then(loadSuccess, loadFail)
		ToasterTool.success("添加实验室", "添加实验室成功！")
	}
}])