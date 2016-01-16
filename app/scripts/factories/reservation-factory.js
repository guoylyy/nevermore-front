'use strict';

/**
 * @ngdoc service
 * @name labcloud.reservationService
 * @description
 * # reservationService
 * Factory in the labcloud.
 */
angular.module('nevermore')
  .factory('Reservation', function($resource, sessionService, $rootScope) {
      var baseUrl = base_Url+'/api/reservation';
      var new_baseUrl = base_Url + "/reservation"
      var headers = sessionService.headers();
      //var headers = {'x-auth-token': $rootScope.token};
      return {
        all: function() {
          return $resource(baseUrl + '/semester/:semester/list/all', {
            'semester': "@semester"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        allWithoutToekn: function() {
          return $resource(baseUrl + '/semester/list/all', {
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        allByStatus: function() {
          return $resource(baseUrl + '/semester/:semesterId/reservations', {
            'semesterId': "@semesterId"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        allByStatusPage: function() {
          return $resource(baseUrl + '/semester/:semesterId/reservations/page/:pageSize/:pageNumber', {
            'semesterId': "@semesterId",
            'pageSize': "@pageSize",
            'pageNumber': "@pageNumber"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        reservation: function(){
          return $resource(new_baseUrl, {}, {
            "post": {
              method: "POST",
              headers: sessionService.headers(),
            }
          })
        },
        clazzReservation: function() {
          return $resource(baseUrl + '/classReservation', {}, {
            'post': {
              method: 'POST',
              headers: sessionService.headers()
            }
          });
        },
        studentReservation: function() {
          return $resource(baseUrl + '/studentReservations', {}, {
            'post': {
              method: 'POST',
              headers: sessionService.headers()
            }
          });
        },
        verify: function() {
          return $resource(baseUrl + '/:id/verify', {
            "id": "@id"
          }, {
            'post': {
              method: 'POST',
              headers: sessionService.headers()
            }
          });
        },
        teacherResByStatusPage: function() {
          return $resource(baseUrl + '/teacher/:accountId/page/:pageSize/:pageNumber', {
            'accountId': "@accountId",
            'pageSize': "@pageSize",
            'pageNumber': "@pageNumber"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        studentResByStatusPage: function() {
          return $resource(baseUrl + '/student/:accountId/page/:pageSize/:pageNumber', {
            'accountId': "@accountId",
            'pageSize': "@pageSize",
            'pageNumber': "@pageNumber"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        studentAvailableResByPage: function() {
          return $resource(baseUrl + '/studentAvailable/:accountId/page/:pageSize/:pageNumber', {
            'accountId': "@accountId",
            'pageSize': "@pageSize",
            'pageNumber': "@pageNumber"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        allTeacherRes: function() {
          return $resource(baseUrl + '/semester/:semesterId/teacher/:teacherId/list', {
            'semesterId': "@semesterId",
            'teacherId': "@teacherId"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        allLabTeacherRes: function() {
          return $resource(baseUrl + '/labTeacher/:teacherId/semester/:semesterId/list', {
            'semesterId': "@semesterId",
            'teacherId': "@teacherId"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        studentGrabLab: function() {
          return $resource(baseUrl + '/studentReservation/:id/student/apply', {
            'id': "@id"
          }, {
            'post': {
              method: 'POST',
              headers: sessionService.headers()
            },
            'delete': {
              method: 'DELETE',
              headers: sessionService.headers()
            }
          });
        },
        reservationedStudents: function(){
          return $resource(baseUrl + '/:id/students/all', {
            'id': "@id"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        reservationLabTeachers: function(){
          return $resource(baseUrl + '/:id/labteachers', {
            'id': "@id"
          }, {
            'get': {
              method: 'GET',
              headers: sessionService.headers()
            }
          });
        },
        cancelReservation: function(){
          return $resource(baseUrl + '/:resType/:id/cancel',{
            'resType':"@resType",
            'id':"@id"
          }, {
            'delete':{
              method: 'DELETE',
              headers: sessionService.headers()
            }
          });
        }
    };
  });
