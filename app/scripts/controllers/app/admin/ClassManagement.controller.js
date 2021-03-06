app.controller("ClassManagementController", ["$scope", "ClazzManageFactory", "generalService", "AccountManageFactory",
	"CourseManageFactory", "sessionService", "ToasterTool", "ManagementService", "AlertTool",
function($scope, ClazzManageFactory, generalService, AccountManageFactory, CourseManageFactory, sessionService,
	 ToasterTool, ManagementService, AlertTool){
	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources
	$scope.deleteResource = deleteResource

	loadResources()

	function loadResources(){
		ManagementService.loadResources(ClazzManageFactory, {
			pageSize: $scope.resources.paginator.itemsPerPage,
			pageNum: $scope.resources.paginator.page
		}).then(loadSuccess, loadFail)
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		ManagementService.errorHandler(error)
	}

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-class.html"
		var controller = "ModifyClassController"
		var modifyDialog = new ManagementService.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller, {
			semester: function(){
				return sessionService.getCurrentSemester()
			},
			teacherResource: function(){
				return AccountManageFactory.all().get({
					role: "teachers",
				}).$promise
			},
			courseResource: function(){
				return CourseManageFactory.all().get().$promise
			},
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

	function commitDelete(resource){
		return ClazzManageFactory.clazz().delete({
			id: resource.id
		}).$promise
	}

	function onModify(){
		loadResources()
		ToasterTool.success("编辑班级", "编辑班级成功！")
	}

	function onDelete(data){
		if(data.success){
			loadResources()
			ToasterTool.success("删除班级", "删除班级成功！")
		}else{
			ToasterTool.error(data.message);
		}
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-class.html"
		var controller = "AddClassController"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller, {
			semester: function(){
				return sessionService.getCurrentSemester()
			},
			teacherResource: function(){
				return AccountManageFactory.all().get({
					role: "teachers",
				}).$promise
			},
			courseResource: function(){
				return CourseManageFactory.all().get().$promise
			},
		})
	}

	function onAdd(){
		loadResources()
		ToasterTool.success("添加班级", "添加班级成功！")
	}
}]);
