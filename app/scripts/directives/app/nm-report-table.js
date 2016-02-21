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
        editable: '=',
        experiment: '='
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
      controller: function ($scope, ngDialog) {
        $scope.chooseChart = function (data) {
          var dialog = ngDialog.open({
            template: 'tpl/app/modal/choose-chart.html',
            controller:'ChooseChartModalCtrl',
            className: 'nm-dialog nm-dialog-md',
            closeByDocument: true,
            closeByEscape: true,
            resolve: {
              data : function() {
                return data;
              },
              expId: function () {
                return $scope.experiment;
              }
            }
          });
        }
      }
    };
  });
