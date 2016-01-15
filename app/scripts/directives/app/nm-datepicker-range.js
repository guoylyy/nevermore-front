angular.module('nevermore')
  .directive('nmDatepickerRange', ['uibDatepickerPopupConfig', function (uibDatepickerPopupConfig) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        beginDate: '=',
        endDate: '=',
        changeBeginDate: '&?',
        changeEndDate: '&?'
      },
      template: [
        '<div class="clearfix">',
          '<div class="input-group w-sm pull-left">',
            '<input type="text" class="form-control w-sm" max-date="endDate" readonly="readonly" ng-model="beginDate" ng-change="changeBeginDate()" is-open="status.beginOpened" uib-datepicker-popup datepicker-options="dateOptions">',
            '<span class="input-group-btn">',
              '<button type="button" class="btn btn-default" ng-click="openBegin($event)"><i class="glyphicon glyphicon-calendar"></i></button>',
            '</span>',
          '</div>',
          '<div class="block pull-left m-t-xs">&nbsp;~&nbsp;</div>',
          '<div class="input-group w-sm pull-left">',
            '<input type="text" class="form-control w-sm" min-date="beginDate" readonly="readonly" ng-model="endDate" ng-change="changeEndDate()" is-open="status.endOpened" uib-datepicker-popup datepicker-options="dateOptions">',
            '<span class="input-group-btn">',
              '<button type="button" class="btn btn-default" ng-click="openEnd($event)"><i class="glyphicon glyphicon-calendar"></i></button>',
            '</span>',
          '</div>',
        '</div>'
      ].join(''),
      controller: function ($scope) {
        $scope.status = {
          beginOpened: false,
          endOpened: false
        };

        $scope.dateOptions = {
          showWeeks: false,
          class: 'tiger-datepicker'
        };
        $scope.openBegin = function($event) {
          $scope.status.beginOpened = true;
        };
        $scope.openEnd = function($event) {
          $scope.status.endOpened = true;
        };

        uibDatepickerPopupConfig.currentText = '今天';
        uibDatepickerPopupConfig.clearText = '清除';
        uibDatepickerPopupConfig.closeText = '关闭';

      },
      link: function (scope, elem, attr) {

      }
    }
  }]);
