'use strict';

app.controller('MessageListController', ['$scope', '$stateParams', '$sce', 'MessageFactory', 'nmMsgNumberService', 'ToasterTool',
function($scope, $stateParams, $sce, MessageFactory, nmMsgNumberService, ToasterTool) {
  var areas = [{
      name: "消息列表",
      code: "list"
    }, {
      name: "消息详情",
      code: "detail"
    }];
  $scope.pageData = {
    models: areas,
    currentModel: areas[0],
    pageTitle: '',
    checkAll: false,
    queryObject: {
      operation: "list",
      pageNum: 1,
      isRead: null,
      isArchived: false,
      bizType: null
    },
    list: [], // 消息列表
    paginator: null, // 分页器
    messageTypes: [ // 消息类型
      {code: null, value: "全部消息"},
      {code: "EXPERIMENT_NOTIFICATION", value: "实验通知"},
      {code: "RESERVATION_NOTIFICATION", value: "预约通知"},
      {code: "SYSTEM_NOTIFICATION", value: "系统通知"}
    ],
    currentMessageType: null, // 当前消息类型
    currentMessage: null // 当前消息
  };
  var pageData = $scope.pageData;
  pageData.currentMessageType = pageData.messageTypes[0];
  pageData.queryObject.isRead = $stateParams.isRead;
  switch (pageData.queryObject.isRead) {
    case "true":
      pageData.pageTitle = '已读消息';
      break;
    case "false":
      pageData.pageTitle = '未读消息';
      break;
    default:
      pageData.pageTitle = '全部消息';
      break;
  }
  // 获取消息
  getList(pageData.queryObject);


  // 全选
  $scope.checkAll = function() {
      var markAs = pageData.checkAll;
      markCheckOfList(pageData.list, markAs);
  };

  // 消息类型变换
  $scope.changeMessageType = function(messageType) {
    pageData.currentMessageType = messageType;
    pageData.queryObject.bizType = messageType.code;
    pageData.queryObject.pageNum = 1;

    getList(pageData.queryObject);
  }

  // 消息页码改变
  $scope.changePageNum = function() {
    pageData.queryObject.pageNum = pageData.paginator.page;
    getList(pageData.queryObject);
  }

  // 查看消息详情
  $scope.viewMessageDetail = function(message) {
    pageData.currentModel = pageData.models[1];
    pageData.currentMessage = message;
    markMessageRead(message);
  }

  // 消息转换器
  $scope.trustDangerousContent = function(content) {
     return $sce.trustAsHtml(content);
   };

  // 全选消息
  function markCheckOfList(list, checkValue) {
    if(!checkValue){
      pageData.checkAll = checkValue;
    }
    for (var i = 0; i < list.length; i++) {
      list[i]['isCheck'] = checkValue;
    }
  };

  // 返回消息列表
  $scope.returnList = function() {
    pageData.currentModel = pageData.models[0];
    pageData.currentMessage = null;
  }

  // 获取消息列表
  function getList(queryObject) {
    MessageFactory.messages().get(queryObject).$promise
    .then(function(data) {
      if (data.success) {
        pageData.list = data.data;
        pageData.paginator = data.paginator;
        angular.forEach(pageData.messages, function(item) {
          // item.title && (item.title = item.title.trim());
          item.content && (item.content = item.content.replace(/(?:\r\n|\r|\n)/g, '<br />'));
        })
      } else {
        ToasterTool.error('获取消息列表失败');
      }
    });
  }

  // 标记消息为已读
  function markMessageRead(message) {
    // 如果已读，则直接返回
    if (message.isRead) {
      return;
    }
    MessageFactory.message().put({
        id: message.id
      }, {
        isRead: true
    }).$promise
    .then(function(data) {
      if (data.success) {
        // 显式更新消息数量
        nmMsgNumberService.updateMsgNumber();
        // 如果处于只看未读状态，则更新消息列表
        if (pageData.queryObject.isRead) getList(pageData.queryObject);
        message.isRead = true;
      }
    });
  }


}]);
