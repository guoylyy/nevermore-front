'use strict';

/**
 * 短信设置模态框
 */
void function() {
  app.controller('SmsConfigEditCtrl', ['$scope', 'ngDialog', 'AlertTool',
      function($scope, ngDialog, AlertTool) {
        $scope.sms = {

        }
        var sms = $scope.sms;

        if($scope.ngDialogData.smsConfig == null) {
          sms.smsConfig = {
            notificationDay: 0,
            notificationTime: null,
            isActive: true
          };
        }else{
          sms.smsConfig = $scope.ngDialogData.smsConfig ;
        }

        $scope.changed = function(temp) {
          console.log(temp);
        }

        // 新建短信设置
        $scope.createSmsConfig = function() {

        }

        // 更新短信设置
        $scope.updateSmsConfig = function() {

        }

        // 更新短信设置
        $scope.cancel = function() {

        }
      }])
}();
