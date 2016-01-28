app.controller("ModifyExperimentCtrl", ["$scope", "data", "ExperimentManage",
    "ManagementService", "AlertTool","ToasterTool",
    function($scope, data, ExperimentManage, ManagementService, AlertTool, ToasterTool) {
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
        $scope.modifyExperiment = modifyExperiment
        $scope.deleteExperiment = deleteExperiment
        $scope.errorTip = ""

        // ~ 修改
        function modifyExperiment() {
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
            return ExperimentManage.experiment().put({
                "id": copiedResource.id,
            }, submitResource)
        }

        function updateLocalResource(data) {
            angular.copy(copiedResource, originResource)
        }

        // ~ 删除
        function deleteExperiment(resource) {
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
            return ExperimentManage.experiment().delete({
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
