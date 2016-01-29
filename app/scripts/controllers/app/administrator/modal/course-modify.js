app.controller("ModifyCourseCtrl", ["$scope", "data", "CourseManageFactory", "ManagementService", "AlertTool",
    "ToasterTool",
    function($scope, data, CourseManageFactory, ManagementService, AlertTool,ToasterTool) {
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
        $scope.modifyCourse = modifyCourse
        $scope.deleteCourse = deleteCourse
        $scope.errorTip = ""

        // ~ 修改
        function modifyCourse() {
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
            return CourseManageFactory.course().put({
                "id": copiedResource.id,
            }, submitResource)
        }

        function updateLocalResource(data) {
            angular.copy(copiedResource, originResource)
        }

        // ~ 删除
        function deleteCourse(resource) {
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
                              ToasterTool.error(data.message);
                            }
                        })
                        .catch($scope.errorHandler)
                }
            })
        }

        function commitDelete(resource) {
            return CourseManageFactory.course().delete({
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
