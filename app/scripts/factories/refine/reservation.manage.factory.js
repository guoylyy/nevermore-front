'use strict';

/**
 * 学期相关api
 */
angular.module('nevermore')
  .factory('ReservationManage', function ($resource, sessionService, $rootScope) {
    var baseUrl = "http://localhost:8080/reservation";
    return {
      reservation: function(){
        return $resource(baseUrl + '/:id', {id:"@id"}, {
          'get': {
            method: 'GET',
            headers: sessionService.headers()
          },
          'put': {
            method: 'PUT',
            headers: sessionService.headers()
          },
          'delete': {
            method: 'DELETE',
            headers: sessionService.headers()
          }
        });
      },
      verify: function(){
        return $resource(baseUrl + '/:id/verification', {id:"@id"}, {
          'post': {
            method: 'POST',
            headers: {
              'x-auth-token':"172581d693b0460ab48dfc09469a8567"
            }
          }
        });
      },
      page: function() {//分页获取预约
        return $resource(baseUrl + '/reservations?scope=list', {
        }, {
          'get': {
            method: 'GET',
            headers: {
              'x-auth-token':"172581d693b0460ab48dfc09469a8567"
            }
          }
        });
      }
    };
  });
