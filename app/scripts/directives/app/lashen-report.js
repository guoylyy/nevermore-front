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
      restrict: 'E',
      controller: function ($scope, SystemService, $location) {
        if(SystemService.isLogin()){
            $location.path('/app/home');
        }
      }
    };
  });
