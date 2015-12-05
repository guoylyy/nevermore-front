'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:labHeader
 * @description
 * # labHeader
 */
angular.module('nevermore')
  .directive('portalHeader', function () {
    return {
      templateUrl: 'tpl/portal/block/header.html',
      restrict: 'E',
      controller: function ($scope, SystemService, $location) {
        if(SystemService.isLogin()){
            $location.path('/app/home');
        }
      }
    };
  });
