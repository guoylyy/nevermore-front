'use strict';

/**
 * 短信设置模态框
 */
void function() {
  app.controller('SmsConfigEditCtrl', ['$scope', 'ngDialog', 'AlertTool', 'ToasterTool', 'ManageSms',
      function($scope, ngDialog, AlertTool, ToasterTool, ManageSms) {
        $scope.sms = {
          smsConfig: null,
          action: null,
          isCreate: false,
          smsConfigEdit: null
        }
        var sms = $scope.sms;

        if($scope.ngDialogData.smsConfig == null) {
          sms.isCreate = true;
          sms.smsConfig = {
            notificationDay: 0,
            notificationTime: new Date(),
            isActive: true
          };
          sms.action = "创建";
        }else{
          sms.isCreate = false;
          sms.smsConfigEdit = $scope.ngDialogData.smsConfig;
          sms.smsConfig = angular.copy(sms.smsConfigEdit);
          sms.action = "更新";
        }

        // 新建短信设置
        $scope.createSmsConfig = function() {
          ManageSms.smsScheduler().post(sms.smsConfig).$promise
          .then (function(data) {
            if (data.success) {
              ToasterTool.success('新建短信发送配置成功。');
              $scope.closeThisDialog({
                  'success': data.success
              });
            } else {
              ToasterTool.error('新建短信发送配置失败。');
            }
          }, function(error) {
            console.log(error);
          })
        }

        // 更新短信设置
        $scope.updateSmsConfig = function() {
          ManageSms.smsSchedulerId().put({id: sms.smsConfig.id}, sms.smsConfig).$promise
          .then (function(data) {
            if (data.success) {
              ToasterTool.success('更新短信发送配置成功。');
              $scope.closeThisDialog({
                  'success': data.success
              });
            } else {
              ToasterTool.error('更新短信发送配置失败。');
            }
          }, function(error) {
            console.log(error);
          })
        }

        // 判断是否可以更新或创建
        $scope.isInvalid = function() {
          if (sms.isCreate) {
            return $scope.smsConfigForm.$invalid;
          } else {
            return $scope.smsConfigForm.$invalid || angular.equals(sms.smsConfig, sms.smsConfigEdit);
          }
        }

      }])
}();
