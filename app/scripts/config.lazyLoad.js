'use strict';

angular.module('nevermore')
  .constant('JQ_CONFIG', {
    slimScroll: ['../bower_components/slimscroll/jquery.slimscroll.min.js'],
    slider: [
      '../bower_components/bootstrap-slider/bootstrap-slider.js'
    ]
  })
  // oclazyload config
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      modules: [
        {
          name: 'ui.select',
          files: [
            '../bower_components/ui-select/dist/select.min.js',
            '../bower_components/ui-select/dist/select.min.css'
          ]
        },
        {
          name: 'ngDialog',
          files: [
            '../bower_components/ng-dialog/js/ngDialog.js',
            '../bower_components/ng-dialog/css/ngDialog.css',
            '../bower_components/ng-dialog/css/ngDialog-theme-default.css'
          ]
        },
        {
          name: 'ngFileUpload',
          files: [
            '../bower_components/ng-file-upload/ng-file-upload.js',
            '../bower_components/ng-file-upload/ng-file-upload-shim.js'
          ]
        },
        {
          name: 'ngImgCrop',
          files: [
            '../bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
            '../bower_components/ng-img-crop/compile/minified/ng-img-crop.css'
          ]
        },
        {
          name:'ui.calendar',
          files: ['../bower_components/angular-ui-calendar/src/calendar.js']
        }
      ]
    });
  }]);
