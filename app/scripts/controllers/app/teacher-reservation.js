'use strict';

app.controller('TeacherReservationCtrl', function($scope, ngDialog,
   $rootScope, $stateParams, Reservation, generalService, qService, sessionService) {

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

  $scope.addReservation = function(){
    var dialog = ngDialog.open({
      template: 'tpl/app/modal/reservation-edit.html',
      controller:'TeacherReservationModalCtrl',
      className: 'nm-dialog nm-dialog-sm',
      closeByDocument: true,
      closeByEscape: true,
      resolve: {
          data: function() {
            return {};
          },
          clazzs: function(qService, Clazz) {
            return qService.tokenHttpGet(Clazz.teacherClazzs, {
              'teacherId':$rootScope.currentUser.id,
              'semesterId':sessionService.getCurrSemeter().id
            }); //获取教师本人的clazz
          },
          semester: function(sessionService) {
            return sessionService.getCurrSemeter();
          },
          slots: function(qService, Semester) {
            return qService.tokenHttpGet(Semester.slots, {});
          }
        }
    });

    dialog.closePromise.then(function(data) {
      if (data.value!=null
          &&data.value!='$escape'
          &&data.value!='$closeButton'
          &&data.value!='$document') {
        $scope.map.Reservations[$scope.title].data.curPageNum = 1;
        $scope.pageReservation();
      }
    });
  }

  $scope.reservationDetail = function (reservation) {
    var dialog = ngDialog.open({
      template: 'tpl/app/modal/reservation-detail.html',
      controller: 'ReservationDetailModalCtrl',
      className: 'nm-dialog nm-dialog-sm',
      closeByDocument: true,
      closeByEscape: true,
      resolve: {
          data: function() {
            return reservation;
          }
        }
    });
    dialog.closePromise.then(function(data) {
      if (data.value!=null
          &&data.value!='$escape'
          &&data.value!='$closeButton'
          &&data.value!='$document') {
        $scope.map.Reservations[$scope.title].data.curPageNum = 1;
        $scope.pageReservation();
      }
    });
  }

  load('Reservations',$scope.title);

});
