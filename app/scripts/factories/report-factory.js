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
    return {
      template : function(){
        return $resource(report_Url + '/template/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET'
          }
        });
      },
      report: function() {
        return $resource(report_Url + '/:stuId/:classId/:expId', {stuId:'@stuId', classId:'@classId', expId:'@expId'}, {
          'get': {
            method: 'GET'
          },
          'post': {
            method: 'POST'
          }
        })
      },
      save: function() {
        return $resource(report_Url, {}, {
          'post': {
            method: 'POST'
          }
        })
      },
      answer: function(headers) {
        return $resource(report_Url + '/answer/:expId', {expId:'@expId'}, {
          'get': {
            method: 'GET',
            headers: headers
          }
        });
      }
    };
  });
