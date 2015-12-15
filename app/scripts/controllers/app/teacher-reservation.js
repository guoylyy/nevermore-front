'use strict';

app.controller('TeacherReservationCtrl', function($scope, ngDialog,
   $rootScope, $stateParams, Reservation, generalService, qService, sessionService) {

  $scope.title = $stateParams.title;
  var semester = sessionService.getCurrSemeter();

  $scope.testDialog = function(){
    ngDialog.open({
      template: 'tpl/app/modal/reservation-edit.html',
      className: 'nm-dialog nm-dialog-md',
      closeByDocument: true,
      closeByEscape: true
    });
  }


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
    }
  };

  var load = function(type, status) {
    if (type == 'Reservations' && $scope.map.Reservations[status].data.totalItemNum > 0) {
      return;
    } else {
      loadFactory[type](status);
    }
  };

  var loadFactory = {};
  loadFactory.Reservations = function(status) {
    qService.tokenHttpGet(Reservation.teacherResByStatusPage, {
      'semester': semester.id,
      'accountId': $rootScope.currentUser.id,
      'pageSize': generalService.pageSize(),
      'pageNumber': $scope.map.Reservations[status].data.curPageNum,
      'status': status
    }).then(function(rc) {
      $scope.map.Reservations[status].data = rc;
    })
  };

  $scope.pageReservation = function(){
    loadFactory['Reservations']($scope.title);
  }

  load('Reservations',$scope.title);

});
