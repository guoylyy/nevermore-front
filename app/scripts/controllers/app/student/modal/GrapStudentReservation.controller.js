'use strict';

app.controller('GrapStudentReservationController', ['$scope', 'resList', 'ReservationFactory',
'ToasterTool',
function ($scope, resList, ReservationFactory, ToasterTool) {
  $scope.reservations = filterReservation(resList.data);

  $scope.addReservation = addReservation

  function addReservation(reservation){
    ReservationFactory.studentReservation().
      post({
        reservationId: reservation.id
      }).$promise
        .then(function(response){
          if(response.success){
            ToasterTool.success("个人实验预约","预约成功，赶快准备去做实验吧");
            $scope.closeThisDialog("success");
          }else{
            ToasterTool.error(response.message);
          }
        });
  }

  function filterReservation(resList){
    var list = [];
    angular.forEach(resList, function(data){
      if(data.currPersonCount < data.personCount && !data.isExpired){
        list.push(data);
      }
    });
    return list;
  }
}]);
