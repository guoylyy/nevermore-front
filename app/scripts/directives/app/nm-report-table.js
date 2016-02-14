'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:nmReport
 * @description
 * # nmReport
 */
angular.module('nevermore')
  .directive('nmreporttable', function () {
    return {
      templateUrl: 'tpl/app/blocks/nm-report-table.html',
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        editable: '='
      },
      link:function(scope, element, attrs, ngModelCtrl) {
        scope.title = attrs.title;
        ngModelCtrl.$render = function () {
          scope.table = ngModelCtrl.$viewValue;
        };
        scope.$watch('table', function () {
          ngModelCtrl.$setViewValue(scope.table);
        });
      },
      controller: function ($scope, $localStorage) {
      }
    };
  });
