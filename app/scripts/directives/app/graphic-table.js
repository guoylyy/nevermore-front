'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:graphictable
 * @description
 * # graphictable
 */
angular.module('nevermore')
  .directive('graphictable', function () {
    return {
      templateUrl: 'tpl/app/blocks/graphic-table.html',
      restrict: 'E',
      require: 'ngModel',
      scope: {
        editable: '=',
        experiment: '='
      },
      link:function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$render = function () {
          scope.table = ngModelCtrl.$viewValue;
        };
        scope.$watch('table', function () {
          ngModelCtrl.$setViewValue(scope.table);
        });
      },
      controller: function ($scope, ngDialog) {
        $scope.chooseChart = function (type,material) {
          var dialog = ngDialog.open({
            template: 'tpl/app/modal/choose-chart.html',
            controller:'ChooseChartController',
            className: 'nm-dialog nm-dialog-md',
            closeByDocument: true,
            closeByEscape: true,
            resolve: {
              type : function() {
                return type;
              },
              material: function () {
                return material;
              },
              expId: function () {
                return $scope.experiment;
              },
              table: function () {
                return $scope.table;
              }
            }
          });
        }
      }
    };
  });
