'use strict';

app.controller('ProfilePersonCtrl', ['$scope', '$rootScope','Account', 'sessionService', 'ResTool', 'ToasterTool', 'ngDialog', 'Upload',
function($scope, $rootScope, Account, sessionService, ResTool, ToasterTool, ngDialog, Upload) {
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

  var currentUser = sessionService.getCurrUser();

  // 获取个人信息
  function getProfileDate() {
    Account.account().get({'id': currentUser.id},
      function success(data) {
        $scope.personData.currentUser = data.data;
        $scope.personData.editUser = angular.copy(data.data);

        angular.forEach(data.data, function(value, key) {
          $rootScope.currentUser[key] = value;
        });
        sessionService.saveCurrUser($rootScope.currentUser);
        // $rootScope.currentUser = angular.copy(data.data);
      },
      function error(data) {
        ToasterTool.error("个人信息获取失败");
      }
    );
  }

  // 检验表格是否可提交
  $scope.isvalidForm = function() {
    return $scope.profilePersonForm.$valid
      && !angular.equals(personData.editUser, personData.currentUser);
  }

  // 更新个人信息
  $scope.save = function() {
    Account.account().put({'id': currentUser.id}, personData.editUser,
      function success(data) {
        ToasterTool.success("个人信息更新成功");
        getProfileDate();
      },
      function error(data) {
        ToasterTool.error("个人信息更新失败");
      }
    );
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
        if(data.value) {
          var uploadPromise = Upload.upload({
              url: base_Url + '/api/account/'+ currentUser.id +'/icon',
              headers: sessionService.headers(),
              data: {
                file: Upload.dataUrltoBlob(data.value, 'icon.png')
              }
            }).then(function (response) {
              if(response.data && response.data.errorCode == "NO_ERROR") {
                ToasterTool.success("头像更新成功");
                getProfileDate();
              } else {
                ToasterTool.error("头像更新失败");
              }
            });
          } else {
            ToasterTool.error("头像更新失败");
          }
        }
      });
    };


  // 获取个人信息
  getProfileDate();
}]);
