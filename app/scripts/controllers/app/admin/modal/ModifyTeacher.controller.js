app.controller("ModifyTeacherController", ["$scope", "data", "AccountManageFactory",
    "ManagementService", "AlertTool", "ToasterTool",
    function($scope, data, AccountManageFactory, ManagementService, AlertTool, ToasterTool) {
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
            "check": false
          },
          {
            "value":"实验教师",
            "code": "TEACHER_LAB",
            "check": false
          }
        ];

        //根据用户角色做标记

        var originResource = data,
            copiedResource = angular.copy(originResource)
        $scope.resource = copiedResource
        markRole()
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
            if(getSelectedRoles().length == 0){
              errorHandler("必须选择一个角色");
              return;
            }
            var submitResource = angular.copy(copiedResource);
            submitResource.gender = copiedResource.gender.code
            submitResource.roles = getSelectedRoles()
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
        function markRole(){
          angular.forEach($scope.resource.roles, function(data){
            for(var i=0; i<$scope.roleList.length; i++){
              if(data.name.code === $scope.roleList[i].code){
                $scope.roleList[i].check = true;
              }
            }
          });
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
