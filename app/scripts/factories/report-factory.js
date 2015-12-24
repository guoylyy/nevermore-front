'use strict';

/**
 * @ngdoc service
 * @name labcloud.reportService
 * @description
 * # reportService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Report', function ($resource, $rootScope) {
    var baseUrl = "http://nmscore.daiguanwang.cn/report"

    return {
      template : function(){
        return $resource(baseUrl + '/template/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET'
          }
        });
      },
      report: function() {
        return $resource(baseUrl, {}, {
          'get': {
            method: 'GET'
          },
          'post': {
            method: 'POST'
          }
        })
      },
      save: function() {
        return $resource(baseUrl + '/save', {}, {
          'post': {
            method: 'POST'
          }
        })
      },
      answer : function(){
        return $resource(baseUrl + '/answer/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET'
          }
        });
      }
    };
  });
