app.controller("AddLabCtrl", ["$scope", "LabManage", "ManagementService",
    function($scope, LabManage, ManagementService) {
        $scope.activeList = [{
            "value": "开放",
            "code": true,
        }, {
            "value": "关闭",
            "code": false,
        }, ];

        $scope.addLab = addLab

        var adding = false

        function addLab() {
            if (resourceComplete()) {
                commitLab().$promise
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
            //TODO:校验输入
            return true;
        }

        function commitLab() {
            adding = true
            var postResource = angular.copy($scope.resource)
            return LabManage.create().post(postResource)
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
            adding = false
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
