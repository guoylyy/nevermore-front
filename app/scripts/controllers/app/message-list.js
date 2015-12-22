'use strict';

app.controller('MessageListCtrl', ['$scope', '$stateParams',
function($scope, $stateParams) {
  $scope.pageData = {
    pageTitle: '',
    checkAll: false,
    queryObject: {
      isRead: null
    },
    list: [],
    paramItems: [],
    currentParam: null
  };
  var pageData = $scope.pageData;

  pageData.list = [
    {"isRead": false, "title": "重要通知：阿里云上云培训课，邀您体验！还可获得参课证书", "createTime": "2015-12-18 18:16:18", "type": "服务消息-产品动态"},
    {"isRead": false, "title": "想获得更多返利？就趁阿里云嘉年华！", "createTime": "2015-12-15 12:18:37", "type": "活动消息-优惠活动"},
    {"isRead": true, "title": "想获得更多返利？就趁阿里云嘉年华！", "createTime": "2015-12-15 12:18:37", "type": "活动消息-优惠活动"},
    {"isRead": false, "title": "12.1-12.31云服务器续费满就送，最高￥1000，最低￥100，100%中！", "createTime": "2015-12-08 11:21:16", "type": "活动消息-优惠活动"},
    {"isRead": false, "title": "云翼杯·高校创新大赛报名开始啦！", "createTime": "2015-12-02 15:10:11", "type": "产品消息-域名和网站"},
    {"isRead": true, "title": "阿里云特邀您参与业务安全体验调研", "createTime": "	2015-12-01 11:20:03", "type": "活动消息-问卷回访"},
    {"isRead": false, "title": "云端双11火力全开！云服务器5折起，满千元最高送千元！", "createTime": "2015-11-11 18:12:00", "type": "活动消息-优惠活动"}
  ]

  pageData.paramItems = [
    {"title": "全部类型消息", "show_title": ""},
    {"title": "课程信息", "count": 1, "show_title": ""},
    {"title": "实验信息", "count": 0, "show_title": ""},
    {"title": "通知信息", "count": 3, "show_title": ""},
    {"title": "站内信息", "count": 0, "show_title": ""},
    {"title": "其他信息", "count": 0, "show_title": ""},
  ]

  angular.forEach(pageData.paramItems, function(item) {
    if (item['count']) {
      item['show_title'] = item['title'] + "(" + item['count'] + ")";
    } else {
      item['show_title'] = item['title'];
    }
  });
  pageData.currentParam = pageData.paramItems[0];
  $scope.getList = function(paramItem) {
    pageData.currentParam = paramItem;
  }

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

  //全选
  $scope.checkAll = function() {
      var markAs = pageData.checkAll;
      markCheckOfList(pageData.list, markAs);
  };

  // 给返回的用户打标签
  function markCheckOfList(list, checkValue) {
    if(!checkValue){
      pageData.checkAll = checkValue;
    }
    for (var i = 0; i < list.length; i++) {
      list[i]['isCheck'] = checkValue;
      list[i]['birthday'] = new Date(list[i].birthday);
    }
  };

}]);
