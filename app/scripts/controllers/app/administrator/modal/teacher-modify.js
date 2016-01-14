app.controller("ModifyTeacherAccountCtrl", ["$scope", "data", "AccountManage", "ManagementService", "AlertTool",
    function($scope, data, AccountManage, ManagementService, AlertTool) {
        $scope.genderList = [{
            "value": "男",
            "code": "MALE",
        }, {
            "value": "女",
            "code": "FEMALE",
        }, ];

        var originResource = data,
            copiedResource = angular.copy(originResource)

        $scope.resource = copiedResource
        $scope.pending = false
        $scope.modifyResource = modifyResource
        $scope.deleteResource = deleteResource
        $scope.modifyPassword = modifyPassword
        $scope.errorTip = ""

        // ~ 修改
        function modifyResource() {
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
            //TODO:校验输入
            if ($scope.resource.number === "") {
                return false
            }
            return true
        }
        function commitModify() {
            $scope.pending = true
            var submitResource = angular.copy(copiedResource);
            submitResource.gender = copiedResource.gender.code
            return AccountManage.account().put({
                "id": copiedResource.id,
            }, submitResource)
        }
        function updateLocalResource(data) {
            angular.copy(copiedResource, originResource)
        }

        // ~ 删除
        function deleteResource(resource) {
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
            return AccountManage.account().delete({
                id: copiedResource.id
            }).$promise
        }

        // ~ 修改密码
        function modifyPassword(resource) {
            if (resourceComplete()) {
                commitModifyPassword().$promise
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
            //TODO:校验输入
            if($scope.resource.newPassword != $scope.resource.confirmPassword)
              return false
            return true
        }
        function commitModifyPassword() {
            $scope.pending = true
            var submitResource = angular.copy(copiedResource);
            submitResource.gender = copiedResource.gender.code
            submitResource.password = $scope.resource.newPassword
            return AccountManage.account().put({
                "id": copiedResource.id,
            }, submitResource)
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
