app.controller("SemesterManagementCtrl", ["$scope", "Semester", "generalService",
	"ToasterTool", "ManagementService", "AlertTool",
function($scope, Semester, generalService, ToasterTool, ManagementService, AlertTool){
	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.deleteResource = deleteResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources

	loadResources()

	function loadResources(){
		ManagementService.loadResources(Semester, {
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
