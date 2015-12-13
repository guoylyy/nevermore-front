'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:labHeader
 * @description
 * # labHeader
 */
angular.module('nevermore')
  .directive('appHeader', function () {
    return {
      templateUrl: 'tpl/app/blocks/header.html',
      restrict: 'E',
      controller: function ($scope, sessionService, $location) {
        var currentUser = sessionService.getCurrUser();
        $scope.logout = function(){
            sessionService.delToken();
        }
      }
    };
  });
