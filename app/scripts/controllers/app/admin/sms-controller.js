void function() {
  app.controller("ManageSmsCtrl", ['$scope', 'ManageSms', 'ToasterTool', 'ngDialog', 'AlertTool',
  function($scope, ManageSms, ToasterTool, ngDialog, AlertTool){
    $scope.smsCtrl = {
      smsConfigs: [{
        notificationDay: 1,
        notificationTime: new Date(),
        isActive: true
      }, {
        notificationDay: 2,
        notificationTime: new Date(),
        isActive: true
      }],
      smsQuery: null,
      smsStatusList: [{
        code: null,
        isActive: true,
        value: "全部"
      }, {
        code: "SENT_SUCCESS",
        isActive: false,
        value: "发送成功"
      }, {
        code: "SENT_FAILED",
        isActive: false,
        value: "发送失败"
      }]
    }
    var smsCtrl = $scope.smsCtrl;
    initSmsConfig();

    // 修改事件
    $scope.deleteSmsConfig = function(config) {
      AlertTool.deleteConfirm({
        title: '确定要删除短信发送配置?'
      }).then(function(isConfirm) {
        if(isConfirm) {
            AlertTool.close();
          }
        });
    }

    $scope.switchIsActive = function(config) {
      console.log(config);
    }

    // 初始化短信设置页面,获取短信设置
    function initSmsConfig() {
      smsCtrl.smsClick = {
        notificationDay: false,
        notificationTime: false
      }
      ManageSms.smsConfig().get().$promise
			.then(
        function(data) {
          if (data.success) {

          } else {
            //TODO: 获取数据失败处理逻辑
            ToasterTool.error("警告", "获取短信设置列表失败");
          }
	      },
        function(error) {
          console.log(error);
        })
    }

    // 新建短信发送配置
    $scope.createSmsConfig = function() {
      var dialog = ngDialog.open({
        template: 'tpl/app/admin/modal/edit-sms-config.html',
        controller: 'SmsConfigEditCtrl',
        className: 'nevermore-dialog nevermore-dialog-md',
        closeByDocument: true,
        closeByEscape: true,
        data: {
          smsConfig: null
        }
      });
      dialog.closePromise.then(function(data) {
        if (data.value != null && data.value.success) {
          ToasterTool.success('新建短信发送配置成功');
          initSmsConfig();
        }
      });
    };

    // 新建短信发送配置
    $scope.editSmsConfig = function(config) {
      var dialog = ngDialog.open({
        template: 'tpl/app/admin/modal/edit-sms-config.html',
        controller: 'SmsConfigEditCtrl',
        className: 'nevermore-dialog nevermore-dialog-md',
        closeByDocument: true,
        closeByEscape: true,
        data: {
          smsConfig: angular.copy(config)
        }
      });
      dialog.closePromise.then(function(data) {
        if (data.value != null && data.value.success) {
          ToasterTool.success('更新短信发送配置成功');
          initSmsConfig();
        }
      });
    };

/*****************************短信历史纪录***************************************/
    // 初始化短信历史记录
    $scope.initSmsList = function() {
      smsCtrl.smsQuery = {
        status: smsCtrl.smsStatusList[0],
        type: null,
        pageNum: 1,
        beginDate: null,
        endDate: null
      }
      $scope.querySmsList(smsCtrl.smsQuery);
    }

    $scope.filterConditionChange = function(varName, varValue) {
      smsCtrl.smsQuery[varName] = varValue;
      smsCtrl.smsQuery.pageNum = 1;
      $scope.querySmsList(smsCtrl.smsQuery);
    }

    $scope.querySmsList = function(smsQuery) {
      var tempQuery = angular.copy(smsQuery);
      tempQuery.status = tempQuery.status ? tempQuery.status.code : null;
      tempQuery.type = tempQuery.type ? tempQuery.type.code : null;
      ManageSms.smses().get(tempQuery).$promise
      .then(
        function(data) {
          if (data.success) {

          } else {
            //TODO: 获取数据失败处理逻辑
            ToasterTool.error("警告", "获取短信历史纪录失败");
          }
        },
        function(error) {
          console.log(error);
        })
    }
  }])
}();
