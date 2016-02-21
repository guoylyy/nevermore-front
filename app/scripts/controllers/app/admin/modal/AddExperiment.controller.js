app.controller("AddExperimentController", ["$scope", "ExperimentManageFactory", "ManagementService",
    function($scope, ExperimentManageFactory, ManagementService) {
        $scope.activeList = [{
            "value": "开放",
            "code": true,
        }, {
            "value": "关闭",
            "code": false,
        }, ];

        $scope.addExperiment = addExperiment

        $scope.adding = false

        function addExperiment() {
            if (resourceComplete()) {
                commitExperiment().$promise
                    .then(removeErrorTip)
                    .then(resourceValid)
                    .then(function(data) {
                        $scope.closeThisDialog({
                            resource: data.data
                        })
                    })
                    .catch(errorHandler)
            } else {
                errorHandler("请完整填写信息")
            }
        }

        function resourceComplete() {
            return true;
        }

        function commitExperiment() {
            $scope.adding = true
            var postResource = angular.copy($scope.resource)
            postResource.active = true;
            return ExperimentManageFactory.create().post(postResource)
        }

        function removeErrorTip(data) {
            $scope.errorTip = ""
            return data
        }

        function resourceValid(data) {
            if (data.success) {
                return data
            } else {
                throw new Error(data)
            }
        }

        function errorHandler(error) {
            $scope.adding = false
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
