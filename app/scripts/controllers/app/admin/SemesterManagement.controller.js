app.controller("SemesterManagementController", ["$scope", "SemesterFactory", "generalService",
	"ToasterTool", "ManagementService", "AlertTool",
function($scope, SemesterFactory, generalService, ToasterTool, ManagementService, AlertTool){
	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.deleteResource = deleteResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources
	$scope.setAsCurrent = setAsCurrent
	loadResources()

	function loadResources(){
		ManagementService.loadResources(SemesterFactory, {
			pageSize: generalService.pageSize(),
			pageNum: $scope.resources.paginator.page
		}).then(loadSuccess, loadFail)
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		ManagementService.errorHandler(error)
	}

	function setAsCurrent(resource){
		AlertTool.confirm({title:"是否确认置为当前学期?"}).then(function(isConfirm) {
	    if(isConfirm) {
				AlertTool.close();
				commitSetCurrent(resource)
				.then(onSetCurrent)
				.catch($scope.errorHandler)
	    }
	  })
	}

	function deleteResource(resource){
		AlertTool.deleteConfirm({title:"是否确认删除?"}).then(function(isConfirm) {
	    if(isConfirm) {
				AlertTool.close();
				commitDelete(resource)
				.then(onDelete)
				.catch($scope.errorHandler)
	    }
	  })
	}

	function commitSetCurrent(resource){
		return SemesterFactory.semester().put({
			id:resource.id
		}).$promise
	}

	function commitDelete(resource){
		return SemesterFactory.semester().delete({
			id: resource.id
		}).$promise
	}

	function onSetCurrent(data){
		if(data.success){
			loadResources()
			ToasterTool.success("设置当前学期成功！")
		}else{
			ToasterTool.error(data.message);
		}
	}

	function onDelete(data){
		if(data.success){
			loadResources()
			ToasterTool.success("删除学期成功！")
		}else{
			ToasterTool.error(data.message);
		}
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-semester.html"
		var controller = "AddSemesterController"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		loadResources()
		ToasterTool.success("添加学期成功！")
	}
}]);
