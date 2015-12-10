'use strict';

angular.module('nevermore')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
      function($stateProvider, $urlRouterProvider, JQ_CONFIG) {
        $urlRouterProvider
          .otherwise('/index');
        //portal
        $stateProvider
          .state('portal', {
            abstract: true,
            url: '/portal',
            templateUrl: 'tpl/portal/portal.html',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'styles/portal.css',
                ]);
              }]
            }
          })
          .state('portal.index', {
            url: '^/index',
            templateUrl: 'tpl/portal/index.html',
            controller: 'IndexController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/portal/index.js',
                  'scripts/directives/portal/portal-header.js',
                  'scripts/directives/portal/portal-footer.js'
                ]);
              }]
            }
          })
          .state('portal.login', {
            url: '^/signin',
            templateUrl: 'tpl/portal/login.html',
            controller: 'LoginController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/portal/login.js',
                  'scripts/directives/portal/portal-footer.js',
                  'scripts/directives/portal/portal-header.js'
                ]);
              }]
            }
          })
          .state('portal.calendar', {
            url: '^/calendar',
            templateUrl: 'tpl/portal/calendar.html',
            controller: 'CalendarController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/portal/calendar.js',
                  'scripts/directives/portal/portal-footer.js',
                  'scripts/directives/portal/portal-header.js'
                ]);
              }]
            }
          })
          //app
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app/app.html',
            controller:'AppCtrl',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app.js',
                  'styles/app.css'
                ]);
              }]
            }
          })
          .state('app.index', {
            abstract: true,
            url: '^/app/index',
            templateUrl: 'tpl/app/index.html',
            controller: 'AppIndexController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/app-index.js',
                ]);
              }]
            }
          })
          .state('app.index.teacher-reservation', {
            url: '^/app/index/reservation/teacher/:title',
            templateUrl: 'tpl/app/teacher-reservation.html',
            controller: 'TeacherReservationCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher-reservation.js',
                ]);
              }]
            }
          })
          .state('app.index.student-reservation', {
            url: '^/app/index/reservation/student/:title',
            templateUrl: 'tpl/app/student-reservation.html',
            controller: 'StudentReservationCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/student-reservation.js',
                ]);
              }]
            }
          })
          .state('app.course', {
            abstract: true,
            url: '^/app/course',
            templateUrl: 'tpl/app/course.html',
            controller: 'AppCourseController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/app-course.js',
                ]);
              }]
            }
          })
          .state('app.course.student-class', {
            url: '^/app/course/student/class',
            templateUrl: 'tpl/app/student-class.html',
            controller: 'StudentClassCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/student-class.js',
                ]);
              }]
            }
          })
          .state('app.course.teacher-class', {
            url: '^/app/course/teacher/class/:id/:name/:number',
            templateUrl: 'tpl/app/teacher-class.html',
            controller: 'TeacherClassCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher-class.js',
                ]);
              }]
            }
          })
          .state('app.course.report', {
            url: '^/app/course/report',
            templateUrl: 'tpl/app/report.html',
            controller: 'ReportCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report.js',
                ]);
              }]
            }
          })
          .state('app.course.report.report-basic', {
            url: '^/app/course/report/basic',
            templateUrl: 'tpl/app/report-basic.html',
            controller: 'ReportBasicCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report-basic.js',
                  'scripts/directives/app/graphic-table.js',
                  'scripts/directives/app/lashen-report.js'
                ]);
              }]
            }
          })
          .state('app.course.report.report-data', {
            url: '^/app/course/report/data',
            templateUrl: 'tpl/app/report-data.html',
            controller: 'ReportDataCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report-data.js',
                  'scripts/directives/app/lashen-report.js'
                ]);
              }]
            }
          })
          .state('app.course.report.report-graphic', {
            url: '^/app/course/report/graphic',
            templateUrl: 'tpl/app/report-graphic.html',
            controller: 'ReportGraphicCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report-graphic.js',
                  'scripts/directives/app/graphic-table.js'
                ]);
              }]
            }
          })
          .state('app.course.report.report-question', {
            url: '^/app/course/report/question',
            templateUrl: 'tpl/app/report-question.html',
            controller: 'ReportQuestionCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report-question.js'
                ]);
              }]
            }
          })
          .state('app.profile', {
            abstract: true,
            url: '^/app/profile',
            templateUrl: 'tpl/app/profile.html',
            resolve: {
            }
          })
          .state('app.profile.person', {
            url: '^/app/profile/person',
            templateUrl: 'tpl/app/profile-person.html',
            controller: 'ProfilePersonCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/profile-person.js'
                ]);
              }]
            }
          })
          .state('app.profile.password', {
            url: '^/app/profile/password',
            templateUrl: 'tpl/app/profile-password.html',
            controller: 'ProfilePasswordCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/profile-password.js'
                ]);
              }]
            }
          })
          .state('app.message', {
            url: '^/app/message',
            templateUrl: 'tpl/app/message.html',
            resolve: {

            }
          })
          .state('app.calendar', {
            url: '^/app/calendar',
            templateUrl: 'tpl/app/calendar.html',
            controller:'FullcalendarCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'lib/jquery/fullcalendar/fullcalendar.css',
                  'lib/jquery/fullcalendar/theme.css',
                  'lib/jquery/jquery-ui-1.10.3.custom.min.js',
                  'lib/libs/moment.min.js',
                  'lib/jquery/fullcalendar/fullcalendar.min.js',
                  'ui.calendar',
                  'scripts/controllers/app/app-calendar.js'
                ]);
              }]
            }
          })
          ;
      }
    ]
  )
  .run(

  );

  //定义请求地址，可修改
  var base_Url = 'http://localhost:8080';
