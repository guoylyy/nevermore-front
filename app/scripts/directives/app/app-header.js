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
      controller: function ($scope, $rootScope, sessionService, $location) {
        var currentUser = sessionService.getCurrUser();
        $rootScope.baseUrl = base_Url || '';
        $scope.logout = function(){
            sessionService.delToken();
        }
      }
    };
  });
