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
          .state('portal', {
            abstract: true,
            url: '/portal',
            templateUrl: 'tpl/portal/portal.html',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('styles/portal.css');
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
                  'scripts/directives/portal/tiger-portal-header.js'
                ]);
              }]
            }
          });
      }
    ]
  )
  .run(
    ['SystemService', 'ResTool',  function (SystemService, ResTool) {

    }]
  )
  .run(
    ['$rootScope', 'SystemService', '$state',
      function ($rootScope, SystemService, $state) {
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
          if(/^app/.test(next.name)) {
            if(!SystemService.isLogin()) {
              event.preventDefault();
              $state.go('portal.login');
            }
          }
        });
      }
    ]
  );
