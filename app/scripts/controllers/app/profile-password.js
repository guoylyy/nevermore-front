'use strict';

app.controller('ProfilePasswordCtrl', ['$scope', '$rootScope','Account', 'ToasterTool', 'sessionService',
function($scope, $rootScope, Account, ToasterTool, sessionService) {
  $scope.password = {
    passwordEdit: {
      newPassword: null,
      oldPassword: null
    }
  };

  var currentUser = sessionService.getCurrUser();

  $scope.updatePassword = function() {
    Account.password().put({'id': currentUser.id}, $scope.password.passwordEdit,
      function success(data) {
        ToasterTool.info("更新密码成功");

        $scope.password.passwordEdit = {};
        $scope.passwordForm.$setPristine();
      },
      function error(data) {
        ToasterTool.error("更新密码失败");
      }
    );
  }
}]);
