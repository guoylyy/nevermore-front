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
            controller: 'PortalController',
            templateUrl: 'tpl/portal/portal.html',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'styles/portal.css',
                  'scripts/controllers/portal/portal.js'
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
            controller: 'LoginCtrl',
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
          .state("app.teacher", {
            url: '^/app/teacher',
            templateUrl: 'tpl/app/teacher/index.html',
            controller: 'TeacherIndexController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher/index.js',
                ]);
              }]
            },
          })
          .state("app.teacher.reservation", {
            url: "^/app/teacher/reservation",
            templateUrl: "tpl/app/teacher/reservation.html",
            controller: "TeacherReservationController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/teacher/reservation.controller.js',
                ]);
              }]
            },
          })
          .state("app.teacher.class-selection", {
            url: "^/app/teacher/class-selection",
            templateUrl: "tpl/app/teacher/class-selection.html",
            controller: "TeacherClassSelectionController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/class-selection.controller.js",
                ])
              }]
            },
          })
          .state("app.teacher.class", {
            url: "^/app/teacher/class",
            templateUrl: "tpl/app/teacher/class.html",
            controller: "TeacherClassController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/class.controller.js",
                ])
              }]
            },
          })
          .state("app.teacher.class.main-page", {
            url: "/main-page",
            templateUrl: "tpl/app/teacher/main-page.html",
            controller: "TeacherMainPageController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/main-page.controller.js",
                ])
              }]
            },
          })
          .state("app.teacher.class.files", {
            url: "/files",
            templateUrl: "tpl/app/teacher/files.html",
            controller: "TeacherFilesController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/main-page.controller.js",
                ])
              }]
            },
          })
          .state("app.teacher.class.appointment", {
            url: "/appointment",
            templateUrl: "tpl/app/teacher/appointment.html",
            controller: "TeacherAppointmentController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/appointment.controller.js",
                ])
              }],
            },
          })
          .state("app.teacher.class.task", {
            url: "/task",
            templateUrl: "tpl/app/teacher/task.html",
            controller: "TeacherTaskController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/task.controller.js",
                ])
              }],
            },
          })
          .state("app.teacher.class.task-detail", {
            url: "/task-detail",
            templateUrl: "tpl/app/teacher/task-detail.html",
            controller: "TeacherTaskDetailController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/task-detail.controller.js",
                ])
              }],
            },
          })
          .state("app.teacher.class.task-report", {
            url: "/task-report",
            templateUrl: "tpl/app/teacher/task-report.html",
            controller: "TeacherTaskReportController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/task-report.controller.js",
                ])
              }],
            },
          })
          .state("app.teacher.class.student", {
            url: "/student",
            templateUrl: "tpl/app/teacher/student.html",
            controller: "TeacherStudentController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/teacher/student.controller.js",
                ])
              }],
            },
          })
          .state("app.student", {
            url: "^/app/student",
            templateUrl: "tpl/app/student/index.html",
            controller: "StudentIndexController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/controllers/app/student/index.controller.js",
                ])
              }],
            },
          })
          .state("app.student.reservation", {
            url: "^/app/student/reservation",
            templateUrl: "tpl/app/student/reservation.html",
            controller: "StudentReservationController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/reservation.controller.js",
                ])
              }],
            },
          })
          .state("app.student.class-selection", {
            url: "^/app/student/class-selection",
            templateUrl: "tpl/app/student/class-selection.html",
            controller: "StudentClassSelectionController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/class-selection.controller.js",
                ])
              }],
            },
          })
          .state("app.student.class", {
            url: "/class/:classID",
            templateUrl: "tpl/app/student/class.html",
            controller: "StudentClassController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/class.controller.js",
                ])
              }],
            },
          })
          .state("app.student.class.main-page", {
            url: "/main-page",
            templateUrl: "tpl/app/student/main-page.html",
            controller: "StudentMainPageController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/main-page.controller.js",
                ])
              }],
            },
          })
          .state("app.student.class.task", {
            url: "/task",
            templateUrl: "tpl/app/student/task.html",
            controller: "StudentTaskController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/task.controller.js",
                ])
              }],
            },
          })
          .state("app.student.class.file", {
            url: "/file",
            templateUrl: "tpl/app/student/file.html",
            controller: "StudentFileController",
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  "scripts/controllers/app/student/file.controller.js",
                ])
              }],
            },
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
                  "scripts/factories/StateChain.factory.js",
                  'ngDialog',
                  'NmDatepicker',
                  'scripts/controllers/app/modal/teacher-reservation-modal.js',
                  'scripts/controllers/app/modal/reservation-detail-modal.js',
                  "scripts/factories/InputValidator.factory.js",
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
                  'scripts/controllers/app/modal/file-upload.js',
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

          //管理员界面
          .state('app.admin-account',{
            url: '^/app/admin/account',
            templateUrl: 'tpl/app/admin/account-index.html',
            controller: ['$state', function($state){
              $state.go('app.admin-account.teacher');
            }],
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/directives/app/search-action-bar.js",
                  "scripts/services/app/admin/management-service.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.admin-account.teacher',{ //教师列表
            url: '^/app/admin/account/teacher',
            templateUrl:'tpl/app/admin/teacher-account.html',
            controller: "TeacherAccountCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/administrator/teacher-management.js",
                  "scripts/controllers/app/administrator/modal/teacher-add.js",
                  "scripts/controllers/app/administrator/modal/teacher-modify.js",
                ])
              }]
            }
          })
          .state('app.admin-account.student',{ //学生列表
            url: '^/app/admin/account/student',
            templateUrl:'tpl/app/admin/student-account.html',
            controller: "StudentAccountCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/administrator/student-management.js",
                  "scripts/controllers/app/administrator/modal/student-add.js",
                  "scripts/controllers/app/administrator/modal/student-modify.js",
                ])
              }]
            }
          })
          .state('app.admin-resource',{ //实验资源管理
            url: '^/app/admin/resource',
            templateUrl: 'tpl/app/admin/experiment-index.html',
            controller: ['$state', function($state){
              $state.go('app.admin-resource.lab');
            }],
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/controllers/app/admin/experiment-index.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.admin-resource.lab',{
            url: '^/app/admin/resource/lab',
            templateUrl: 'tpl/app/admin/experiment-lab.html'
          })
          .state('app.admin-resource.experiment',{
            url: '^/app/admin/resource/experiment',
            templateUrl: 'tpl/app/admin/experiment.html'
          })
          .state('app.admin-resource.course',{
            url: '^/app/admin/resource/course',
            templateUrl: 'tpl/app/admin/experiment-course.html'
          })
          .state('app.admin-semester',{ //学期配置
            url: '^/app/admin/semester',
            templateUrl: "tpl/app/admin/semester-class.html",
            controller: ['$state', function($state){
              var currState = $state.current.name;
              if(currState === "app.admin-semester"){
                  $state.go('app.admin-semester.class');
              }
            }],
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/semester-class.js",
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/services/session-service.js",
                  "scripts/directives/app/nm-datepicker.js",
                  "scripts/services/app/admin/management-service.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.admin-semester.semester', {
            url: '^/app/admin/semester/semester',
            templateUrl: "tpl/app/admin/semester-management.html",
            controller: "SemesterManagementCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/administrator/semester-management.js",
                  "scripts/controllers/app/administrator/modal/semester-add.js"
                ])
              }]
            }
          })
          .state('app.admin-semester.class', {
            url: '^/app/admin/semester/class',
            templateUrl: "tpl/app/admin/class-management.html",
            controller: "ClassManagementCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/administrator/clazz-management.js",
                  "scripts/controllers/app/administrator/modal/clazz-add.js",
                  "scripts/controllers/app/administrator/modal/clazz-modify.js"
                ])
              }]
            }
          })

          .state('app.admin-appointment',{ //预约审批
            url: '^/app/admin/appointment',
            templateUrl: "tpl/app/admin/appointment-verification.html",
            controller: ['$state', function($state){
              $state.go('app.admin-appointment.list',{'status':'unverified'});
            }],
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/services/session-service.js",
                  "scripts/services/app/admin/management-service.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.admin-appointment.list',{
            url: "^/app/admin/appointment/:status",
            templateUrl: "tpl/app/admin/verified-experiment-appointment.html",
            controller: "RservationAppointmentCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/administrator/reservation-management.js",
                  "scripts/controllers/app/administrator/modal/clazz-add.js"
                ])
              }]
            }
          })
          .state('app.admin-setting',{ //系统设置
            url: '^/app/admin/setting',
            templateUrl: "tpl/app/admin/system-setting.html",
            controller: ['$state', function($state){
              $state.go('app.admin-setting.sms');
            }],
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/appointment-verification.js",
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/services/session-service.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.admin-setting.sms',{ //短信息设置
            url: '^/app/admin/setting/sms',
            templateUrl: "tpl/app/admin/sms-setting.html"
          })

          /***
            强大的分隔符：：路障路障
            下面是姚神写得管理员路径-切换到上面的路径
            强大的分隔符：：下面不要加代码了，往上面加
          ***/
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
                  "scripts/controllers/app/admin/modify-resource.js",
                  "scripts/factories/InputValidator.factory.js",
                  "scripts/factories/error-handler.factory.js",
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
          .state('app.experiment-resource', {
            abstract: true,
            url: '^/app/experiment/resource',
            templateUrl: 'tpl/app/admin/experiment-index.html',
            controller: 'ExperimentIndexCtrl',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/services/general-service.js",
                  "scripts/services/toaster-tool.js",
                  "scripts/controllers/app/admin/experiment-index.js",
                  "ngDialog",
                ])
              }]
            }
          })
          .state('app.experiment-resource.experiment-lab', {
            url: '^/app/experiment/resource/experiment/lab',
            templateUrl: 'tpl/app/admin/experiment-lab.html',
            controller: 'ExperimentLabCtrl',
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/experiment-lab.js",
                  "scripts/controllers/app/admin/add-experiment-lab.js",
                  "scripts/controllers/app/admin/modify-experiment-lab.js",
                ])
              }]
            },
          })
          .state("app.experiment-resource.experiment", {
            url: "^/app/experiment/resource/experiment-content",
            templateUrl: "tpl/app/admin/experiment.html",
            controller: "ExperimentCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/experiment.js",
                  "scripts/controllers/app/admin/add-experiment.js",
                  "scripts/controllers/app/admin/modify-experiment.js",
                ])
              }]
            }
          })
          .state("app.experiment-resource.experiment-course", {
            url: "^/app/experiment/resource/experiment-resource",
            templateUrl: "tpl/app/admin/experiment-course.html",
            controller: "ExperimentCourseCtrl",
            resolve: {
              controller: ["$ocLazyLoad", function($ocLazyLoad){
                return $ocLazyLoad.load([
                  "scripts/controllers/app/admin/experiment-course.js",
                  "scripts/controllers/app/admin/add-experiment-course.js",
                  "scripts/controllers/app/admin/modify-experiment-course.js",
                ])
              }]
            }
          });
      }
    ]
  )
  .run(

  );
