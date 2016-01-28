app.controller("LabManageCtrl", ["$scope", "LabManage", "generalService",
	"ToasterTool", "ManagementService", "AlertTool",
function($scope, LabManage, generalService, ToasterTool, ManagementService, AlertTool){

	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.pageChanged = loadResources
	$scope.addResource = addResource
	$scope.modifyResource = modifyResource

	loadResources()

	// ~ 搜索
	$scope.onTransit = function(lastAction, nowAction, searchWord) {
			if (lastAction === "searching" && nowAction === "searched") {
					searchAccount(searchWord)
			} else if (lastAction === "searched" && nowAction === "searched") {
					searchAccount(searchWord)
			} else if (lastAction === "searched" && nowAction === "listing") {
					$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
					loadResources()
			}
	}

	function searchAccount(searchWord) {
			commitSearch(searchWord).$promise
					.then(updateAccountsAfterSearch)
					.catch(errorHandler)
	}

	function commitSearch(searchWord) {
			return LabManage.search().get({
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
		ManagementService.loadResources(LabManage, {
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
		var templateUrl = "tpl/app/admin/modal/add-experiment-lab.html"
		var controller = "AddLabCtrl"
		var addDialog = new ManagementService.AddDialog()
		addDialog.setCloseListener(onAdd)
		addDialog.open(templateUrl, controller)
	}
	function onAdd(){
			loadResources()
			ToasterTool.success("添加实验室成功！")
	}

	// ~ 修改信息
	function modifyResource(resource){
		var templateUrl = "tpl/app/admin/modal/modify-experiment-lab.html"
		var controller = "ModifyLabCtrl"
		var modifyDialog = new ManagementService.ModifyDialog()
		modifyDialog.setCloseListener(onModify, onDelete)
		modifyDialog.open(resource, templateUrl, controller, {})
	}
	function onModify(){
			loadResources()
			ToasterTool.success("修改实验室成功！")
	}
	function onDelete(data){
			loadResources()
			ToasterTool.success("实验室", "删除实验室成功！")
	}

}]);
