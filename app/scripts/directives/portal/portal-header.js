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
      controller: function ($scope, sessionService, $rootScope, $localStorage, $state) {
        $scope.currentUser = sessionService.getCurrentUser();
        $scope.showLoginButton = showLoginButton
      	
        $scope.head_click = function(){
          if ($localStorage.token!=null) {
            if ($localStorage.currentUser.show_role == 'STUDENT') {
              $state.go('app.index.student-reservations',{title:'clazz'});
            }else if ($localStorage.currentUser.show_role == 'TEACHER') {
              $state.go('app.index.teacher-reservations',{title:'APPROVED'});
            }else if ($localStorage.currentUser.show_role == 'ADMINISTRATOR') {
              $state.go('app.admin-account.teacher');
            }
            return;
          }
        }

        function showLoginButton(){
      		var CALENDAR_PAGE_HASH = "#/calendar"

      		if(location.hash === CALENDAR_PAGE_HASH){
      			return true
      		}
      		return false
      	}
      }
    };
  });
