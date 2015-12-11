'use strict';

app.controller('TeacherReservationCtrl', function($scope, $rootScope, $stateParams, Reservation, generalService, qService, sessionService) {

  $scope.title = $stateParams.title;
  var semester = sessionService.getCurrSemeter();


  $scope.map = {
    Reservations: {
      'PENDING': {
        data: {
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum:0,
          data: []
        }
      },
      'APPROVED': {
        data: {
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum:0,
          data: []
        }
      },
      'REJECTED': {
        data: {
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum:0,
          data: []
        }
      }
    },
    Calender: {

    }
  };

  var load = function(type, status) {
    if (type == 'Reservations' && $scope.map.Reservations[status].data.totalItemNum > 0) {
      return;
    } else {
      loadFactory[type](status,$scope.map.Reservations[status].data.curPageNum);
    }
  };

  var loadFactory = {};
  loadFactory.Reservations = function(status,pageNumber) {
    qService.tokenHttpGet(Reservation.teacherResByStatusPage, {
      'semester': semester.id,
      'accountId': $rootScope.currentUser.id,
      'pageSize': generalService.pageSize(),
      'pageNumber': pageNumber,
      'status': status
    }).then(function(rc) {
      $scope.map.Reservations[status].data = rc;
    })
  };

  $scope.page_reservation = function(page){
    loadFactory['Reservations']($scope.title,page);
  }

  load('Reservations',$scope.title);

});
