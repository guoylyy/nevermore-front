app.controller("ModifyLabCtrl", ["$scope", "data", "LabManage", "ManagementService", "AlertTool",
    function($scope, data, LabManage, ManagementService, AlertTool) {
        $scope.activeList = [{
            "value": "开放",
            "code": true,
        }, {
            "value": "关闭",
            "code": false,
        }, ];

        var originResource = data,
            copiedResource = angular.copy(originResource)

        $scope.resource = copiedResource
        $scope.pending = false
        $scope.modifyLab = modifyLab
        $scope.deleteLab = deleteLab
        $scope.errorTip = ""

        // ~ 修改
        function modifyLab() {
            if (resourceComplete()) {
                commitModify().$promise
                    .then(removeErrorTip)
                    .then(updateLocalResource)
                    .then(function() {
                        $scope.closeThisDialog("modify")
                    })
                    .catch(errorHandler)
            } else {
                errorHandler("请完整填写信息")
            }
        }

        function resourceComplete() {
            return true
        }

        function commitModify() {
            $scope.pending = true
            var submitResource = angular.copy(copiedResource);
            return LabManage.lab().put({
                "id": copiedResource.id,
            }, submitResource)
        }

        function updateLocalResource(data) {
            angular.copy(copiedResource, originResource)
        }

        // ~ 删除
        function deleteLab(resource) {
            AlertTool.deleteConfirm({
                title: "是否确认删除?"
            }).then(function(isConfirm) {
                if (isConfirm) {
                    AlertTool.close();
                    commitDelete(resource)
                        .then(function() {
                            $scope.closeThisDialog("delete")
                        })
                        .catch($scope.errorHandler)
                }
            })
        }

        function commitDelete(resource) {
            return LabManage.lab().delete({
                id: copiedResource.id
            }).$promise
        }

        // ~ Common
        function removeErrorTip(data) {
            $scope.errorTip = ""
            return data
        }

        function errorHandler(error) {
            $scope.pending = false
            var errorMessage = getErrorMessage(error)
            showErrorTip(errorMessage)
        }

        function getErrorMessage(error) {
            if (typeof error === "object") {
                return error.errorCode || error.toString()
            } else {
                return error.toString()
            }
        }

        function showErrorTip(error) {
            $scope.errorTip = error
        }

    }
])
