app.controller("ExperimentManageCtrl", ["$scope", "ExperimentManage", "generalService",
    "ToasterTool", "ManagementService", "AlertTool",
    function($scope, ExperimentManage, generalService, ToasterTool, ManagementService, AlertTool) {

        $scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
        $scope.pageChanged = loadResources
        $scope.addResource = addResource
        $scope.modifyResource = modifyResource

        loadResources();

        // ~ 列表
        function loadResources() {
            ManagementService.loadResources(ExperimentManage, {
                pageSize: generalService.pageSize(),
                pageNum: $scope.resources.paginator.page
            }).then(loadSuccess, loadFail)
        }

        function loadSuccess(data) {
            angular.copy(data, $scope.resources)
        }

        function loadFail(error) {
            ManagementService.errorHandler(error)
        }

        // ~ 添加
        function addResource() {
            var templateUrl = "tpl/app/admin/modal/add-experiment.html"
            var controller = "AddExperimentCtrl"
            var addDialog = new ManagementService.AddDialog()
            addDialog.setCloseListener(onAdd)
            addDialog.open(templateUrl, controller)
        }

        function onAdd() {
            loadResources()
            ToasterTool.success("添加实验成功！")
        }

        // ~ 修改信息
        function modifyResource(resource) {
            var templateUrl = "tpl/app/admin/modal/modify-experiment.html"
            var controller = "ModifyExperimentCtrl"
            var modifyDialog = new ManagementService.ModifyDialog()
            modifyDialog.setCloseListener(onModify, onDelete)
            modifyDialog.open(resource, templateUrl, controller, {})
        }

        function onModify() {
            loadResources()
            ToasterTool.success("修改实验成功！")
        }

        function onDelete() {
            loadResources()
            ToasterTool.success("删除实验成功！")
        }

    }
]);
