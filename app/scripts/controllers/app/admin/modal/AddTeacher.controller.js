app.controller("AddTeacherController", ["$scope", "AccountManageFactory",
    "ManagementService", "ToasterTool",
    function($scope, AccountManageFactory, ManagementService,ToasterTool) {
        $scope.genderList = [{
            "value": "男",
            "code": "MALE",
        }, {
            "value": "女",
            "code": "FEMALE",
        }, ];

        $scope.roleList= [
          {
            "value":"课程教师",
            "code": 'TEACHER',
            "check": true
          },
          {
            "value":"实验教师",
            "code": "TEACHER_LAB",
            "check": false
          }
        ];

        $scope.addTeacher = addTeacher
        $scope.adding = false

        function addTeacher() {
            if(getSelectedRoles().length == 0){
              errorHandler("必须选择一个角色");
              return;
            }
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
            postResource.role = "TEACHER"
            postResource.roles = getSelectedRoles()
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

        function getSelectedRoles(){
          var list = [];
          angular.forEach($scope.roleList, function(role){
            if(role.check){
              list.push(role.code);
            }
          });
          return list;
        }
    }
])
