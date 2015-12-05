'use strict';

var app =
  angular.module('nevermore')
    .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
      function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
      }
    ])
    .config(function ($httpProvider){
      // $httpProvider.interceptors.push('loadingInterceptor');
    })
    .constant('apiBaseUrl', '//tiger.xiaoguotech.com/api');
