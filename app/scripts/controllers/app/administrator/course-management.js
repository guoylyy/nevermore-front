app.controller("CourseManageCtrl", ["$scope", "CourseManage", "generalService",
	"ToasterTool", "ManagementService", "AlertTool",
function($scope, CourseManage, generalService, ToasterTool, ManagementService, AlertTool){

	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.pageChanged = loadResources
	$scope.addResource = addResource
	$scope.modifyResource = modifyResource
	$scope.addExperiment = addExperiment
	$scope.richModifyResource = richModifyResource

	loadResources();

	// ~ 搜索
	$scope.onTransit = function(lastAction, nowAction, searchWord) {
			if (lastAction === "searching" && nowAction === "searched") {
					searchAccount(searchWord)
			} else if (lastAction === "searched" && nowAction === "searched") {
					searchAccount(searchWord)
			} else if (lastAction === "searched" && nowAction === "listing") {
					$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
					loadResources();
			}
	}

	function searchAccount(searchWord) {
			commitSearch(searchWord).$promise
					.then(updateAccountsAfterSearch)
					.catch(errorHandler)
	}

	function commitSearch(searchWord) {
			return CourseManage.search().get({
					"keyword": searchWord
			})
	}

	function updateAccountsAfterSearch(data) {
			angular.copy(data, $scope.resources)
	}

	function errorHandler(error) {
			console.log(error)
	}

	// ~ 列表
	function loadResources(){
		ManagementService.loadResources(CourseManage, {
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

	// ~ 添加
	function addResource(){
		var templateUrl = "tpl/app/admin/modal/add-experiment-course.html"
		var controller = "AddCourseCtrl"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}
	function onAdd(){
			loadResources()
			ToasterTool.success("添加实验课程成功！")
	}

	// ~ 修改信息
	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-experiment-course.html"
		var controller = "ModifyCourseCtrl"
		var modifyDialog = new ManagementService.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller, {})
	}
	// ~ 修改主页信息
	function richModifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/rich-modify-experiment-course.html"
		var controller = "RichModifyCourseCtrl"
		var richModifyDialog = new ManagementService.RichModifyDialog()
		richModifyDialog.setCloseListener(onRichModify)
		richModifyDialog.open(resource, templateUrl, controller, {})
	}

	function onModify(){
		loadResources()
		ToasterTool.success("修改实验课程成功！")
	}
	function onRichModify(){
		ToasterTool.success("修改实验课程主页成功！")
	}

	function onDelete(data){
			loadResources()
			ToasterTool.success("删除课程", "删除课程成功！")
	}

	// ~ 添加实验
	function addExperiment(resource){
		if(resource.active === false){
			return
		}
		var templateUrl = "tpl/app/admin/modal/add-course-experiment.html"
		var controller = "AddExperimentCtrl"
		var modifyDialog = new ManagementService.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onCancel)
		modifyDialog.open(resource, templateUrl, controller, {})
	}

	function onModify(){
			ToasterTool.success("配置实验成功！")
	}
	function onCancel(){
	}

}]);
