void function() {
  app.controller("SmsSettingController", ['$scope', '$filter', '$timeout', 'ManageSmsFactoryFactory', 'ToasterTool', 'ngDialog', 'AlertTool',
  function($scope, $filter, $timeout, ManageSmsFactoryFactory, ToasterTool, ngDialog, AlertTool){
    // 页面数据结构
    $scope.smsCtrl = {
      smsSchedulerList: null,
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
      }],
      smsRecordList: null
    }
    var smsCtrl = $scope.smsCtrl;
    initSmsSettingPage();

    // 删除事件
    $scope.deleteSmsScheduler = function(config) {
      AlertTool.deleteConfirm({
        title: '确定要删除短信发送配置?'
      }).then(function(isConfirm) {
        if(isConfirm) {
          ManageSmsFactoryFactory.smsSchedulerId().delete({id: config.id}).$promise
          .then(
            function(data) {
              if (data.success) {
                AlertTool.close();
                ToasterTool.success("删除短信发送配置成功。")
                initSmsSettingPage();
              } else {
                ToasterTool.error("删除短信发送配置失败。")
              }
            },
            function(error) {
              console.log(error);
            })
          }
        });
    }

    // 变更是否生效 —— 短信发送配置
    $scope.switchIsActive = function(config) {
      ManageSmsFactoryFactory.smsSchedulerId().put({id: config.id}, config).$promise
      .then(
        function(data) {
          if (data.success) {
            if (config.isActive) {
              ToasterTool.success("成功开启短信发送配置。");
            }
          } else {
            //TODO: 变更是否生效失败
            if (config.isActive) {
              ToasterTool.error("错误", "开启短信发送配置失败。");
            } else {
              ToasterTool.error("错误", "关闭短信发送配置失败。");
            }
            config.isActive = !config.isActive;
          }
        },
        function(error) {
          console.log(error);
        })
    }

    // 初始化短信设置页面,获取短信设置
    $scope.initSmsSchedulerList = function() {
      initSmsSettingPage();
    }

    // 新建短信发送配置
    $scope.createSmsConfig = function() {
      var dialog = ngDialog.open({
        template: 'tpl/app/admin/modal/edit-sms-config.html',
        controller: 'ConfigSmsSettingController',
        className: 'nevermore-dialog nevermore-dialog-md',
        closeByDocument: true,
        closeByEscape: true,
        data: {
          smsConfig: null
        }
      });
      dialog.closePromise.then(function(data) {
        if (data.value != null && data.value.success) {
          initSmsSettingPage();
        }
      });
    };

    // 新建短信发送配置
    $scope.editSmsScheduler = function(config) {
      var dialog = ngDialog.open({
        template: 'tpl/app/admin/modal/edit-sms-config.html',
        controller: 'ConfigSmsSettingController',
        className: 'nevermore-dialog nevermore-dialog-md',
        closeByDocument: true,
        closeByEscape: true,
        data: {
          smsConfig: angular.copy(config)
        }
      });
      dialog.closePromise.then(function(data) {
        if (data.value != null && data.value.success) {
          initSmsSettingPage();
        }
      });
    };

    // 获取短信发送配置
    function initSmsSettingPage() {
      ManageSmsFactoryFactory.smsSchedulers().get().$promise
      .then(
        function(data) {
          if (data.success) {
            smsCtrl.smsSchedulerList = data.data;
          } else {
            //TODO: 获取数据失败处理逻辑
            ToasterTool.error("警告", "获取短信设置列表失败。");
          }
        },
        function(error) {
          console.log(error);
        })
    }

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

    // 查询条件变更 － 短信历史纪录
    $scope.filterConditionChange = function(varName, varValue) {
      if (varName && varValue) {
        smsCtrl.smsQuery[varName] = varValue;
      }
      smsCtrl.smsQuery.pageNum = 1;
      $timeout(function () {
        $scope.querySmsList(smsCtrl.smsQuery);
      }, 0);
    }

    // 查询短信历史纪录列表
    $scope.querySmsList = function(smsQuery) {
      var tempQuery = angular.copy(smsQuery);
      tempQuery.status = tempQuery.status ? tempQuery.status.code : null;
      tempQuery.type = tempQuery.type ? tempQuery.type.code : null;
      tempQuery.beginDate = tempQuery.beginDate ? $filter('date')(tempQuery.beginDate, 'yyyy-MM-dd') : null;
      tempQuery.endDate = tempQuery.endDate ? $filter('date')(tempQuery.endDate, 'yyyy-MM-dd') : null;

      ManageSmsFactoryFactory.smses().get(tempQuery).$promise
      .then(
        function(data) {
          if (data.success) {
            smsCtrl.smsRecordList = data.data;
            smsCtrl.paginator = data.paginator;
          } else {
            //TODO: 获取数据失败处理逻辑
            ToasterTool.error("警告", "获取短信历史纪录失败。");
          }
        },
        function(error) {
          console.log(error);
        })
    }

    // 换页 —— 短信历史纪录
    $scope.smsListPageChanged = function() {
      smsCtrl.smsQuery.pageNum = smsCtrl.paginator.page;
      $scope.querySmsList(smsCtrl.smsQuery);
    }
  }])
}();
