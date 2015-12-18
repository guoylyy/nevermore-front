'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:llashenReport
 * @description
 * # lashenReport
 */
angular.module('nevermore')
  .directive('lashen', function () {
    return {
      templateUrl: 'tpl/app/blocks/lashen-report.html',
      restrict: 'EA',
      require: 'ngModel',
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
        $scope.table = $localStorage.report['3origin_size']['3.1stretch_test-piece'];
      }
    };
  });
