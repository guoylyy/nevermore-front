'use strict';

app.controller('StudentReservationCtrl', function($rootScope,$scope, $stateParams,sessionService, Reservation, generalService, qService) {

  $scope.title = $stateParams.title;

  var semester = sessionService.getCurrSemeter();

  $scope.map = {
    'Reservations':{
      'clazz':{
        data:{
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum: 0,
          data:[]
        }
      },
      'student':{
        data:{
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum: 0,
          data:[]
        }
      }
    }
  };

  var load = function(key, type) {
    if (key == 'Reservations' && $scope.map.Reservations[type].data.totalItemNum > 0) {
      return;
    } else {
      loadFactory[key](type);
    }
  };

  var loadFactory  = {};
  loadFactory.Reservations = function(type){
    qService.tokenHttpGet(Reservation.studentResByStatusPage,{
      'semester':semester.id,
      'accountId': $rootScope.currentUser.id,
      'pageSize':generalService.pageSize(),
      'pageNumber': $scope.map.Reservations[type].data.curPageNum,
      'type': type
    }).then(function(rc){
      $scope.map.Reservations[type].data = rc;
    })
  };
  
  $scope.pageReservation = function(){
    loadFactory['Reservations']($scope.title);
  }

  load('Reservations',$scope.title);

});
