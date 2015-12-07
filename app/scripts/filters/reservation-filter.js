'use strict';


angular.module('nevermore')
  .filter('reservationNumber', function () {
    return function (number) {
      var baseNumber = 100001;
      return baseNumber + parseInt(number);
    };
  })
  .filter('reservationStatus', function(){
    return function (status){
      var text = "";
      switch(status){
        case 'PENDING':
          text = "待审核";
          break;
        case 'APPROVED':
          text = "已通过";
          break;
        case 'REJECTED':
          text = "被拒绝";
          break;
        default:
          text = "未知状态";
      }
      return text;
    };
  });
