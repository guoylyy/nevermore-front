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
      controller: function ($scope, ngDialog) {
        $scope.chooseChart = function () {
          var dialog = ngDialog.open({
            template: 'tpl/app/modal/choose-chart.html',
            controller:'ChooseChartModalCtrl',
            className: 'nm-dialog nm-dialog-sm',
            closeByDocument: true,
            closeByEscape: true,
            resolve: {

              }
          });
        }
      }
    };
  });
