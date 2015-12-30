app.controller("SemesterManagementCtrl", ["$scope", "Semester", "generalService", "ToasterTool", 
function($scope, Semester, generalService, ToasterTool){
	$scope.resources = angular.copy($scope.DEFAULT_RESOURCE_TEMPLATE)
	$scope.modifyResource = modifyResource
	$scope.addResource = addResource
	$scope.pageChanged = loadResources

	loadResources()

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

	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-semester.html"
		var controller = "ModifySemesterCtrl"
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
		ToasterTool.success("编辑学期", "编辑学期成功！")
	}

	function onDelete(){
		loadResources()
		ToasterTool.success("删除学期", "删除学期成功！")
	}

	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-semester.html"
		var controller = "AddSemesterCtrl"
		var addDialog = new $scope.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}

	function onAdd(){
		loadResources()
		ToasterTool.success("添加学期", "添加学期成功！")
	}
}])