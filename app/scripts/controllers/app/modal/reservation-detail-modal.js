'use strict';

app.controller('ReservationDetailModalCtrl', function($scope, data, qService, Reservation) {
    $scope.data = data;
    if($scope.data.status == 'APPROVED'){
      //load 教师
      qService.tokenHttpGet(Reservation.reservationLabTeachers,
        {"id":$scope.data.id}).then(function(data){
          $scope.data.labTeachers = data.data;
        });
    }
    $scope.cancel = function() {
      $modalInstance.dismiss('canceled');
    };
    $scope.save = function() {
      $modalInstance.close($scope.data);
    };

    $scope.cancelReservation = function(rId){

    };
  });
