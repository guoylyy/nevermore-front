'use strict'

app.controller("ExperimentCtrl", ['$scope', 'Exp', 'ToasterTool',
function($scope, Exp, ToasterTool){
	$scope.resources = angular.copy($scope.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource

	$scope.loadResources(Exp).then(loadSuccess, loadFail)

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		$scope.errorHandler(error)
	}

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-experiment.html"
		var controller = "ModifyExperimentCtrl"
		var modifyDialog = new $scope.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller)
	}

	function onModify(){
		ToasterTool.success("编辑实验", "编辑实验成功！")
	}

	function onDelete(){
		$scope.loadResources(Exp).then(loadSuccess, loadFail)
		ToasterTool.success("删除实验", "删除实验成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-experiment.html"
		var controller = "AddExperimentCtrl"
		var addDialog = new $scope.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		$scope.loadResources(Exp).then(loadSuccess, loadFail)
		ToasterTool.success("添加实验", "添加实验成功！")
	}
}])