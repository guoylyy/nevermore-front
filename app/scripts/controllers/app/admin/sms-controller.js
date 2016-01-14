void function() {
  app.controller("ManageSmsCtrl", ['$scope', '$filter', '$timeout', 'ManageSms', 'ToasterTool', 'ngDialog', 'AlertTool',
  function($scope, $filter, $timeout, ManageSms, ToasterTool, ngDialog, AlertTool){
    // 页面数据结构
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
      }],
      smsRecordList: [{
        "id": 1,
        "receiverId": 2,
        "receiverName": "高富好帅",
        "receiverMobile": "15121083384",
        "type": null,
        "content": "大老板黄鹤带着小姨子跑路了",
        "status": {
          "code": "SENT_SUCCESS",
          "value": "发送成功"
        },
        "sendTime": 1452698366000
      },{
        "id": 1,
        "receiverId": 2,
        "receiverName": "高富帅",
        "receiverMobile": "15121083384",
        "type": null,
        "content": "大老板黄鹤带着小姨子跑路了",
        "status": {
          "code": "SENT_SUCCESS",
          "value": "发送成功"
        },
        "sendTime": 1452698366000
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

    // 变更是否生效 —— 短信发送配置
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

      ManageSms.smses().get(tempQuery).$promise
      .then(
        function(data) {
          if (data.success) {
            smsCtrl.smsRecordList = data.data;
            smsCtrl.paginator = data.paginator;
          } else {
            //TODO: 获取数据失败处理逻辑
            ToasterTool.error("警告", "获取短信历史纪录失败");
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
