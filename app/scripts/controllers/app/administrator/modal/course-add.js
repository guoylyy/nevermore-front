app.controller("AddCourseCtrl", ["$scope", "CourseManage", "ManagementService",
    function($scope, CourseManage, ManagementService) {
        $scope.activeList = [{
            "value": "开放",
            "code": true,
        }, {
            "value": "关闭",
            "code": false,
        }, ];

        $scope.addCourse = addCourse

        var adding = false

        function addCourse() {
            if (resourceComplete()) {
                commitCourse().$promise
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

        function commitCourse() {
            adding = true
            var postResouce = angular.copy($scope.resource)
            return CourseManage.create().post(postResouce)
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
