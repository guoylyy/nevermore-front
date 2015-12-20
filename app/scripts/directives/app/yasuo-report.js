'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:yasuoReport
 * @description
 * # yasuoReport
 */
angular.module('nevermore')
  .directive('yasuo', function () {
    return {
      templateUrl: 'tpl/app/blocks/yasuo-report.html',
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
