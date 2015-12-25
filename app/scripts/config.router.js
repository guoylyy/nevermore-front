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
        $stateProvider
          //portal
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
                  'scripts/directives/portal/portal-header.js',
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
          //app
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app/app.html',
            controller:'AppCtrl',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                // $httpProvider.interceptors.push('loadingInterceptor');
                return $ocLazyLoad.load([
                  'scripts/controllers/app.js',
                  'scripts/directives/app/app-header.js',
                  'styles/app.css',
                  'scripts/directives/app/nevermore-empty-panel.js'
                ]);
              }]
            }
          })
          .state('app.index', {
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
          .state('app.index.teacher-reservations', {
            url: '^/app/index/teacher/reservations/:title',
            templateUrl: 'tpl/app/teacher-reservation.html',
            controller: 'TeacherReservationCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher-reservation.js',
                  'scripts/directives/app/pager.js',
                  'ngDialog',
                  'NmDatepicker',
                  'scripts/controllers/app/modal/teacher-reservation-modal.js',
                  'scripts/controllers/app/modal/reservation-detail-modal.js'
                ]);
              }]
            }
          })
          .state('app.index.student-reservations', {
            url: '^/app/index/student/reservations/:title',
            templateUrl: 'tpl/app/student-reservation.html',
            controller: 'StudentReservationCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/student-reservation.js',
                  'scripts/directives/app/pager.js',
                  'ngDialog',
                  'scripts/controllers/app/modal/reservation-detail-modal.js'
                ]);
              }]
            }
          })
          .state('app.course', {
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
            url: '^/app/course/student/class/:id',
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
            url: '^/app/course/teacher/class/:id/:expId',
            templateUrl: 'tpl/app/teacher-class.html',
            controller: 'TeacherClassCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher-class.js',
                  'scripts/directives/app/pager.js',
                  'scripts/directives/app/nm-file-upload.js',
                  'ngDialog'
                ]);
              }]
            }
          })
          .state('app.course.report', {
            url: '^/app/course/report/:expId/:classId',
            templateUrl: 'tpl/app/report.html',
            controller: 'ReportCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report.js',
                  'scripts/directives/app/graphic-table.js',
                  'scripts/directives/app/lashen-report.js',
                  'scripts/directives/app/yasuo-report.js',
                  'scripts/directives/app/lashen-experiment.js',
                  'scripts/directives/app/yasuo-experiment.js',
                  'NmDatepicker',
                  'ngDialog',
                  'scripts/controllers/app/modal/choose-chart.js'
                ]);
              }]
            }
          })
          .state('app.course.report-result', {
            url: '^/app/course/report/result/:expId/:classId/:stuId',
            templateUrl: 'tpl/app/report-result.html',
            controller: 'ReportResultCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/report-result.js',
                  'scripts/directives/app/graphic-table.js',
                  'scripts/directives/app/lashen-report.js',
                  'scripts/directives/app/yasuo-report.js',
                  'scripts/directives/app/lashen-experiment.js',
                  'scripts/directives/app/yasuo-experiment.js',
                  'NmDatepicker',
                  'ngDialog',
                  'scripts/controllers/app/modal/choose-chart.js'
                ]);
              }]
            }
          })
          .state('app.profile', {
            url: '^/app/profile',
            templateUrl: 'tpl/app/profile.html',
            controller: ['$state', function($state){
              $state.go('app.profile.person');
            }]
          })
          .state('app.profile.person', {
            url: '^/app/profile/person',
            templateUrl: 'tpl/app/profile-person.html',
            controller: 'ProfilePersonCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'ngDialog',
                  'ngImgCrop',
                  'scripts/controllers/app/profile-person.js',
                  'scripts/controllers/app/modal/profile-icon.js'
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
          .state('app.message.list', {
            url: '^/app/message/list?isRead',
            templateUrl: 'tpl/app/message-list.html',
            controller: 'MessageListCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/message-list.js'
                ]);
              }]
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
                  'ngDialog',
                  'NmDatepicker',
                  'scripts/controllers/app/app-calendar.js',
                  'scripts/controllers/app/modal/teacher-reservation-modal.js',
                ]);
              }]
            }
          })
          .state('app.account-admin', {
            abstract: true,
            url: '^/app/account/admin',
            templateUrl: 'tpl/app/admin/account-index.html',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/directives/app/search-action-bar.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.account-admin.admin-account', {
            url: '^/app/account/admin/admin/account',
            templateUrl: 'tpl/app/admin/admin-account.html',
            controller: 'AdminAccountCtrl',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/admin-account.js",
                  "scripts/controllers/app/admin/modify-admin-account.js",
                  "scripts/controllers/app/admin/add-admin-account.js",
                  "scripts/controllers/app/admin/modify-admin-password.js",
                ])
              }]
            },
          })
          .state('app.account-admin.teacher-account', {
            url: '^/app/account/admin/teacher/account',
            templateUrl: 'tpl/app/admin/teacher-account.html',
            controller: 'TeacherAccountCtrl',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/teacher-account.js",
                  "scripts/controllers/app/admin/modify-teacher-account.js",
                  "scripts/controllers/app/admin/add-teacher-account.js",
                  "scripts/controllers/app/admin/modify-teacher-password.js",
                ])
              }]
            },
          })
          .state('app.account-admin.student-account', {
            url: '^/app/account/admin/student/account',
            templateUrl: 'tpl/app/admin/student-account.html',
            controller: 'StudentAccountCtrl',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/student-account.js",
                  "scripts/controllers/app/admin/modify-student-account.js",
                  "scripts/controllers/app/admin/add-student-account.js",
                  "scripts/controllers/app/admin/modify-student-password.js",
                ])
              }]
            },
          })
          ;
      }
    ]
  )
  .run(

  );
