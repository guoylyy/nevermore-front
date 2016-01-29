'use strict';

app.controller('ReservationDetailModalController', function($scope, data, qService, Reservation, AlertTool) {
    $scope.data = data;
    if($scope.data.status == 'APPROVED'){
      //load 教师
      qService.tokenHttpGet(Reservation.reservationLabTeachers,
        {"id":$scope.data.id}).then(function(data){
          $scope.data.labTeachers = data.data;
        });
    }

    $scope.cancelReservation = function(rId){
      AlertTool.deleteConfirm({title:'确定要取消这个预约么?',text:''}).then(function(isConfirm) {
        if(isConfirm) {
          qService.tokenHttpDelete(Reservation.cancelReservation, {
            id: rId,
            resType: 'classReservation'
          }).then(function(rc){
            AlertTool.close();
            $scope.closeThisDialog('refresh');
          });
        }
      });
    };
  });
