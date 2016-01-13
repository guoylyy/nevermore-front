app.controller("ClassManagementCtrl", ["$scope", "ClazzManage", "generalService", "AccountManage",
	"CourseManage", "sessionService", "ToasterTool", "ManagementService",
function($scope, ClazzManage, generalService, AccountManage, CourseManage, sessionService, ToasterTool, ManagementService){
	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources

	loadResources()

	function loadResources(){
		ManagementService.loadResources(ClazzManage, {
			pageSize: $scope.resources.paginator.itemsPerPage,
			pageNum: $scope.resources.paginator.page
		}).then(loadSuccess, loadFail)
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		$scope.errorHandler(error)
	}

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-class.html"
		var controller = "ModifyClassCtrl"
		var modifyDialog = new $scope.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller, {
			semester: function(){
				return sessionService.getCurrSemeter()
			},
			teacherResource: function(){
				return Account.all().get({
					userType: "ALL_TEACHER",
				}).$promise
			},
			courseResource: function(){
				return Course.all().get().$promise
			},
		})
	}

	function onModify(){
		ToasterTool.success("编辑班级", "编辑班级成功！")
	}

	function onDelete(){
		loadResources()
		ToasterTool.success("删除班级", "删除班级成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-class.html"
		var controller = "AddClassCtrl"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller, {
			semester: function(){
				return sessionService.getCurrSemeter()
			},
			teacherResource: function(){
				return AccountManage.all().get({
					role: "teachers",
				}).$promise
			},
			courseResource: function(){
				return CourseManage.all().get().$promise
			},
		})
	}

	function onAdd(){
		loadResources()
		ToasterTool.success("添加班级", "添加班级成功！")
	}
}]);
