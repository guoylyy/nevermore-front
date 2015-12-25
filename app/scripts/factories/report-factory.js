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
    var baseUrl = "http://nmscore.daiguanwang.cn/report";

    // this.answer =

    return {
      template : function(){
        return $resource(baseUrl + '/template/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET'
          }
        });
      },
      report: function() {
        return $resource(baseUrl + '/:stuId/:classId/:expId', {stuId:'@stuId', classId:'@classId', expId:'@expId'}, {
          'get': {
            method: 'GET'
          },
          'post': {
            method: 'POST'
          }
        })
      },
      save: function() {
        return $resource(baseUrl, {}, {
          'post': {
            method: 'POST'
          }
        })
      },
      answer: function(headers) {
        return $resource(baseUrl + '/answer/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET',
            headers: headers
          }
        });
      }
    };
  });
