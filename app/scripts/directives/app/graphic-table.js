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
      controller: function ($scope, SystemService, $location) {
        if(SystemService.isLogin()){
            $location.path('/app/home');
        }
      }
    };
  });
