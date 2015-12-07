'use strict';

/**
 * @ngdoc filter
 * @name labcloud.filter:commonFilter
 * @function
 * @description
 * # commonFilter
 * Filter in the labcloud.
 */
angular.module('nevermore')
  .filter('isEmpty', function () {
    return function (input) {
      if(input == undefined || input.length ==0 || input == null){
        return '无';
      }else{
        return input;
      }
    };
  })
  .filter('labStatus', function () {
    return function (input) {
      if(input == 'OPEN'){
        return '开放';
      }else{
        return '关闭';
      }
    };
  })
  .filter('labStatusClass', function () {
    return function (input) {
      if(input == 'OPEN'){
        return 'success';
      }else{
        return 'default';
      }
    };
  })
  .filter('activeText', function () {
    return function (input) {
      if(input){
        return '是';
      }else{
        return '否';
      }
    };
  })
  .filter('activeClass', function () {
    return function (input) {
      if(input){
        return 'success';
      }else{
        return 'default';
      }
    };
  })
  .filter('filePathFilter', function () {
    return function (url) {
      if(url.lastIndexOf('/')> 0){
        return url.slice(url.lastIndexOf('/')+1,url.length);
      }else{
        return url;
      }
    };
  })
  .filter('reserveStatus',function(){
    return function (input) {
      if(input == 'APPROVED'){
        return '已预约';
      }else{
        return '未预约';
      }
    };
  })
  .filter('experimentStatus',function(){
    return function (input) {
      if(input == 'IN_PROGRESS'){
        return '待上传';
      }else if (input == 'SUBMITTED'){
        return '待批改';
      }else if(input == 'COMPLETED'){
        return '已完成';
      }else{
        return '未开始';
      }
    };
  })
  .filter('reportStatus',function(){
    return function (input) {
      if(input == 'IN_PROGRESS'){
        return '已提交';
      }else if (input == 'SUBMITTED') {
        return '已提交';
      }else if (input == 'COMPLETED'){
        return '已批改';
      }
    };
  })
  .filter('recommendCount', function(){
    return function (sourceCount){
      //建议人数是实际人数*1.1
      var targetCount = sourceCount * 1.1;
      targetCount =  Math.round(targetCount);
      return targetCount;
    };
  })
  ;
