'use strict';

app.controller('ProfilePersonController', ['$scope', '$rootScope','AccountFactory', 'sessionService', 'ToasterTool', 'ngDialog', 'FileUploadFactory',
function($scope, $rootScope, AccountFactory, sessionService, ToasterTool, ngDialog, FileUploadFactory) {
  $scope.personData = {
    currentUser: null,
    editUser: null,

    genders: [
      "MALE", "FEMALE"
    ],
    genderMap: {
      "MALE": '男',
      "FEMALE": '女'
    },
    roles: [
      "ADMINISTRATOR", "ALL_TEACHER", "NOR_TEACHER", "LAB_TEACHER", "STUDENT"
    ],
    roleMap: {
      "ADMINISTRATOR": "管理员",
      "ALL_TEACHER": "实验和课程教师",
      "NOR_TEACHER": "课程教师",
      "LAB_TEACHER": "实验教师",
      "STUDENT": "学生"
    },
  };
  var personData = $scope.personData;

  // 获取个人信息
  function getProfileDate() {
    AccountFactory.profile().get(null).$promise
    .then(function success(data) {
      personData.currentUser = data.data;
      personData.editUser = angular.copy(data.data);

      angular.forEach(data.data, function(value, key) {
        $rootScope.currentUser[key] = value;
      });
      sessionService.saveCurrentUser($rootScope.currentUser);
      // $rootScope.currentUser = angular.copy(data.data);
    },
    function error(data) {
      ToasterTool.error("个人信息获取失败");
    })
  }

  // 检验表格是否可提交
  $scope.isvalidForm = function() {
    return $scope.profilePersonForm.$valid
      && !angular.equals(personData.editUser, personData.currentUser);
  }

  // 更新个人信息
  $scope.save = function() {
    var tempUser = {};
    tempUser.gender = personData.editUser.gender.code;
    tempUser.name = personData.editUser.name;
    tempUser.mobile = personData.editUser.mobile;

    AccountFactory.profile().put(tempUser).$promise
    .then(function success(data) {
      ToasterTool.success("个人信息更新成功");
      getProfileDate();
    },
    function error(data) {
      ToasterTool.error("个人信息更新失败");
    })
  }

  // 更新账号头像
  $scope.updateProfileIcon = function () {
    var dialog = ngDialog.open({
      template: 'tpl/app/modal/profile-icon.html',
      controller: 'ProfileIconCtrl',
      className: 'nevermore-dialog nevermore-dialog-md',
      closeByDocument: true,
      closeByEscape: true
    });

    dialog.closePromise.then(function (data) {
      if (data.value != null
        && data.value != '$escape'
        && data.value != '$closeButton'
        && data.value != '$document') {
          if(data.value === 'success') {
            getProfileDate();
          } else {
            // ToasterTool.error("头像更新失败");
          }
        }
      });
    };


  // 获取个人信息
  getProfileDate();
}]);
