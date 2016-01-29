app.controller("ModifyTeacherAccountCtrl", ["$scope", "data", "AccountManageFactory",
    "ManagementService", "AlertTool", "ToasterTool",
    function($scope, data, AccountManageFactory, ManagementService, AlertTool, ToasterTool) {
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
        $scope.modifyTeacher = modifyTeacher
        $scope.deleteTeacher = deleteTeacher
        $scope.modifyTeacherPassword = modifyTeacherPassword
        $scope.errorTip = ""

        // ~ 修改
        function modifyTeacher() {
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
            submitResource.gender = copiedResource.gender.code
            return AccountManageFactory.account().put({
                "id": copiedResource.id,
            }, submitResource)
        }
        function updateLocalResource(data) {
            angular.copy(copiedResource, originResource)
        }

        // ~ 删除
        function deleteTeacher(resource) {
            AlertTool.deleteConfirm({
                title: "是否确认删除?"
            }).then(function(isConfirm) {
                if (isConfirm) {
                    AlertTool.close();
                    commitDelete(resource)
                        .then(function(data) {
                            if(data.success){
                              $scope.closeThisDialog("delete")
                            }else{
                              ToasterTool.error(data.message)
                            }
                        })
                        .catch($scope.errorHandler)
                }
            })
        }
        function commitDelete(resource) {
            return AccountManageFactory.account().delete({
                id: copiedResource.id
            }).$promise
        }

        // ~ 修改密码
        function modifyTeacherPassword(resource) {
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
            if($scope.resource.newPassword != $scope.resource.confirmPassword)
              return false
            return true
        }
        function commitModifyPassword() {
            $scope.pending = true
            var submitResource = angular.copy(copiedResource);
            submitResource.gender = copiedResource.gender.code
            submitResource.password = md5($scope.resource.newPassword)
            return AccountManageFactory.account().put({
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
