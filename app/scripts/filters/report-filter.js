'use strict';


angular.module('nevermore')
  .filter('reportFilter', function () {
    return function (value) {
      if (value != undefined) {
        if(value.range != undefined){
          return value.answer + " ± " +value.range;
        }else{
          return value.answer;
        }
      }
    };
  })
  ;
