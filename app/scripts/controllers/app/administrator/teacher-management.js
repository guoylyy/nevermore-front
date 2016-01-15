app.controller("TeacherAccountCtrl", ["$scope", "AccountManage", "generalService",
    "ToasterTool", "ManagementService", "AlertTool", "AccountManage",
    function($scope, AccountManage, generalService, ToasterTool, ManagementService, AlertTool, AccountManage) {

        $scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
        $scope.pageChanged = loadResources
        $scope.addResource = addResource
        $scope.modifyResource = modifyResource
        $scope.modifyPassword = modifyPassword

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
            return AccountManage.search().get({
                "keyword": searchWord,
                "role": "TEACHER"
            })
        }

        function updateAccountsAfterSearch(data) {
            angular.copy(data, $scope.resources)
        }

        function errorHandler(error) {
            console.log(error)
        }
				
        // ~ 列表
        function loadResources() {
            ManagementService.loadResources(AccountManage, {
                role: "teachers",
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
            var templateUrl = "tpl/app/admin/modal/add-teacher-account.html"
            var controller = "AddTeacherAccountCtrl"
            var addDialog = new ManagementService.AddDialog()
            addDialog.setCloseListener(onAdd)
            addDialog.open(templateUrl, controller)
        }

        function onAdd() {
            loadResources()
            ToasterTool.success("添加教师成功！")
        }

        // ~ 修改信息
        function modifyResource(resource) {
            var templateUrl = "tpl/app/admin/modal/modify-teacher-account.html"
            var controller = "ModifyTeacherAccountCtrl"
            var modifyDialog = new ManagementService.ModifyDialog()
            modifyDialog.setCloseListener(onModify, onDelete)
            modifyDialog.open(resource, templateUrl, controller, {})
        }

        function onModify() {
            loadResources()
            ToasterTool.success("修改教师成功！")
        }

        function onDelete() {
            loadResources()
            ToasterTool.success("删除老师成功！")
        }

        // ~ 修改密码
        function modifyPassword(resource) {
            var templateUrl = "tpl/app/admin/modal/modify-teacher-password.html"
            var controller = "ModifyTeacherAccountCtrl"
            var modifyDialog = new ManagementService.ModifyDialog()
            modifyDialog.setCloseListener(onModifyPassword)
            modifyDialog.open(resource, templateUrl, controller, {})
        }

        function onModifyPassword() {
            loadResources()
            ToasterTool.success("修改密码成功！")
        }

    }
]);
