app.controller("AddStudentController", ["$scope", "AccountManageFactory", "ManagementService",
    function($scope, AccountManageFactory, ManagementService) {
        $scope.genderList = [{
            "value": "男",
            "code": "MALE",
        }, {
            "value": "女",
            "code": "FEMALE",
        }, ];

        $scope.addStudent = addStudent
        $scope.adding = false

        function addStudent() {
            if (accountComplete()) {
                commitAccount().$promise
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

        function accountComplete() {
            return true;
        }

        function commitAccount() {
            $scope.adding = true
            var postResource = angular.copy($scope.resource)
            postResource.role = "STUDENT"
            postResource.password = md5(postResource.password)
            return AccountManageFactory.create().post(postResource)
        }

        function removeErrorTip(data) {
            $scope.errorTip = ""
            return data
        }

        function resourceValid(data) {
            if (data.success) {
                return data
            } else {
                throw data
            }
        }

        function errorHandler(error) {
            $scope.adding = false
            var errorMessage = getErrorMessage(error)
            showErrorTip(errorMessage)
        }

        function getErrorMessage(error) {
            if (typeof error === "object") {
                return error.message;
            }
            return error;
        }

        function showErrorTip(error) {
            $scope.errorTip = error
        }
    }
])
