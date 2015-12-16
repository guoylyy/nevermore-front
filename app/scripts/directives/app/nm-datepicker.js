angular.module('nevermore')
  .directive('nmDatepicker', ['uibDatepickerPopupConfig', function (uibDatepickerPopupConfig) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      replace: true,
      scope: {
        name: '@',
        ngRequired: '@',
        minDate: '=?',
        maxDate: '=?'
      },
      template: [
        '<div class="input-group">',
          '<input name="name" type="text" min-date="minDate" max-date="maxDate" class="form-control" readonly="readonly" ng-model="date" is-open="status.opened" uib-datepicker-popup datepicker-options="dateOptions" ng-required="ngRequired">',
          '<span class="input-group-btn">',
            '<button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>',
          '</span>',
        '</div>'
      ].join(''),
      controller: function ($scope) {
        $scope.name = $scope.name || '';
        $scope.ngRequired = $scope.ngRequired != undefined;

        $scope.minDate = $scope.minDate || null;
        $scope.maxDate = $scope.maxDate || null;

        $scope.status = {
          opened: false
        };

        $scope.dateOptions = {
          showWeeks: false,
          class: 'tiger-datepicker'
        };
        $scope.open = function($event) {
          $scope.status.opened = true;
        };

        uibDatepickerPopupConfig.currentText = '今天';
        uibDatepickerPopupConfig.clearText = '清除';
        uibDatepickerPopupConfig.closeText = '关闭';

      },
      link: function (scope, elem, attr, ngModelCtrl) {
        ngModelCtrl.$render = function () {
          scope.date = ngModelCtrl.$viewValue;
        };

        scope.$watch('date', function () {
          ngModelCtrl.$setViewValue(scope.date);
        });

      }
    }
  }]);
