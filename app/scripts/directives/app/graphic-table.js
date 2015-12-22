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
      scope: {
        editable: '=',
        experiment: '='
      },
      controller: function ($scope, $localStorage, ngDialog) {
        $scope.chooseChart = function (type,material) {
          var dialog = ngDialog.open({
            template: 'tpl/app/modal/choose-chart.html',
            controller:'ChooseChartModalCtrl',
            className: 'nm-dialog nm-dialog-sm',
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
              }
            }
          });
        }
      }
    };
  });
