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
          name: 'TigerCountDownBtn',
          files: [
            '../scripts/directives/app/tiger-countdown-btn.js'
          ]
        },
        {
          name: 'TigerFileUpload',
          files: [
            '../scripts/resources/attach-resource.js',
            '../scripts/directives/app/tiger-file-upload.js'
          ]
        },
        {
          name: 'TigerFileDownload',
          files: [
            '../scripts/resources/attach-resource.js',
            '../scripts/directives/app/tiger-file-download.js'
          ]
        },
        {
          name: 'TigerDatepicker',
          files: [
            '../scripts/directives/app/tiger-datepicker.js'
          ]
        },
        {
          name: 'TigerFromNow',
          files: [
            '../bower_components/moment/min/moment.min.js',
            '../scripts/filters/from-now.js'
          ]
        },
        {
          name: 'TigerFixedHeaderTable',
          files: [
            '../bower_components/angu-fixed-header-table/angu-fixed-header-table.js'
          ]
        }
      ]
    });
  }]);
