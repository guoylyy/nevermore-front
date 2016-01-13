app.controller("SemesterManagementCtrl", ["$scope", "Semester", "generalService", "ToasterTool", "ManagementService",
function($scope, Semester, generalService, ToasterTool, ManagementService){
	$scope.resources = angular.copy($scope.DEFAULT_RESOURCE_TEMPLATE)
	$scope.deleteResource = deleteResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources

	// loadResources()

	function loadResources(){
		$scope.loadResources(Semester, {
			pageSize: generalService.pageSize(),
			pageNumber: $scope.resources.curPageNum,
		}).then(loadSuccess, loadFail)
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		$scope.errorHandler(error)
	}

	function deleteResource(resource){
		commitDelete(resource)
		.then(onDelete)
		.catch($scope.errorHandler)
	}

	function commitDelete(resource){
		return Semester.semester().delete({
			id: resource.id
		}).$promise
	}

	function onDelete(){
		loadResources()
		ToasterTool.success("删除学期", "删除学期成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-semester.html"
		var controller = "AddSemesterCtrl"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		loadResources()
		ToasterTool.success("添加学期", "添加学期成功！")
	}
}])
