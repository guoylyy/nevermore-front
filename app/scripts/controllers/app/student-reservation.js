'use strict';

app.controller('StudentReservationCtrl', function($rootScope,$scope, $stateParams,sessionService, Reservation, generalService, qService, ngDialog, ToasterTool) {

  $scope.title = $stateParams.title;
  $scope.tab = 'reservation';//reservation显示预约列表。openlab表示开放可预约的实验室

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
    },
    grabRes:{//可以抢的预约
      data:{
          curPageNum: 1,
          totalItemNum: 0,
          totalPageNum: 0,
          data:[]
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
  loadFactory.grabRes = function(type){
    qService.tokenHttpGet(Reservation.studentAvailableResByPage,{
      'semester':semester.id,
      'accountId': $rootScope.currentUser.id,
      'pageSize':generalService.pageSize(),
      'pageNumber': $scope.map.grabRes.data.curPageNum
    }).then(function(rc){
      $scope.map.grabRes.data = rc;
    });
  };

  $scope.pageReservation = function(){
    loadFactory['Reservations']($scope.title);
  }

  $scope.reservationDetail = function (reservation) {
    ngDialog.open({
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
  }

  $scope.grab = function(record){
    qService.tokenHttpPost(Reservation.studentGrabLab, {
      'id':record.id
    }).then(function(rc){
      ToasterTool.success('预约成功！','');
      load('grabRes','all');
    });
  };

  $scope.pageGrab = function(){
    loadFactory['grabRes']('all');
  }

  $scope.openLab = function () {
    $scope.tab = "openlab";
    load('grabRes','all');
  }

  $scope.back = function () {
    $scope.tab = "reservation";
  }

  load('Reservations',$scope.title);

});
