'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:llashenReport
 * @description
 * # lashenReport
 */
angular.module('nevermore')
  .directive('lashenexp', function () {
    return {
      templateUrl: 'tpl/app/blocks/lashen-experiment.html',
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
