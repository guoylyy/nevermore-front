'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.generalService
 * @description
 * # generalService
 * Service in the morningStudioApp.
 */
angular.module('nevermore')
  .service('generalService', function ($rootScope, $location, $sessionStorage, $localStorage) {

    this.getReservationColor = function(res){
      var color = '';
      var status = res.status.code;
      if(status=='REJECTED'){
        color = '#777';
      }else if(status == 'APPROVED'){
        color = '#5cb85c';
      }else if(status == 'APPLY'){
        color = '#f0ad4e';
      }else{
        color = '#777';
      }
      return color;
    };

    this.persistentUser = function(loginUser){
      $rootScope.loginUser = loginUser;
      $localStorage.loginUser = loginUser;
    };

    this.pageSize = function(){
      return 10;
    };

    this.clearStorage = function(){
      delete $localStorage.loginUser;
      delete $rootScope.loginUser;
      $location.path('/');
    }

    this.getLoginUser = function(){
      if($rootScope.loginUser != undefined){
        return $rootScope.loginUser;
      }else if($localStorage.loginUser != undefined){
        $rootScope.loginUser = $localStorage.loginUser;
        return $rootScope.loginUser;
      }else{
        return false;
      }
    };

    this.getDefaultDataTemplate = function(){
      var DATA_TEMPLATE = {
        "data": [],
        "totalPageNum": 0,
        "curPageNum": 1,
        "totalItemNum": 0,
      }

      return DATA_TEMPLATE
    }
  });
