'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:pager
 * @description
 * # pager
 */
angular.module('nevermore')
  .directive('nevermorePager', function () {
    return {
      templateUrl: 'tpl/app/blocks/pager.html',
      restrict: 'EA',
      scope:{
        total:'=',
        cur:'=',
        change:'&'
      },
      replace: true,
      link:function($scope, $element, $attrs,$watch) {
        $scope.pages = [];
        //alert($scope.cur);
        $scope.change({page:$scope.cur});

        function reset() {
          $scope.pages = [];
          for (var i = 0; i < $scope.total; i++) {
            $scope.pages.push(i+1);
          }

        }

        $scope.$watch('total',reset);

      },
      controller: function ($scope) {

        $scope.previous = function() {
          $scope.cur = $scope.cur-1;
          $scope.change({page:$scope.cur});
        }
        $scope.next = function() {
          $scope.cur = $scope.cur+1;
          $scope.change({page:$scope.cur});
        }
        $scope.index = function(page) {
          $scope.cur = page;
          $scope.change({page:$scope.cur});
        }
      }
    };
  });
