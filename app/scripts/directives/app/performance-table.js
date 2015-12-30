'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:performanceTable
 * @description
 * # performanceTable
 */
angular.module('nevermore')
  .directive('performance', function () {
    return {
      templateUrl: 'tpl/app/blocks/performance-table.html',
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
