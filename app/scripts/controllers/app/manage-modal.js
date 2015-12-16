'use strict';

/**
 * @ngdoc function
 * @name labcloud.controller:ManageModalCtrl
 * @description
 * # ManageModalCtrl
 * Controller of the labcloud
 */
app.controller('TeacherReservationModalCtrl', function($scope, data, clazzs, semester, slots, qService, Course, Exp, Reservation) {
    $scope.slots = slots.data,
    $scope.clazzs = clazzs.data;
    $scope.data = data;
    $scope.data['semester'] = semester;
    $scope.data['slot'] = slots.data[0];
    $scope.data['applyDate'] = new Date();
    $scope.exps = [];
    $scope.labs = [];

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.clazzChanged = function() {
      qService.tokenHttpGet(Course.courseExps, {
        id: $scope.data.clazz.course.id
      }).then(function(rc) {
        $scope.exps = rc.data;
      });
    };

    $scope.expChanged = function() {
      qService.tokenHttpGet(Exp.labs, {
        id: $scope.data.exp.id
      }).then(function(rc) {
        $scope.labs = rc.data;
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('canceled');
    };

  });
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
