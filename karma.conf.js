// Karma configuration
// Generated on Sat Jan 02 2016 22:22:13 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
        "./app/bower_components/angular/angular.js",
        "./app/bower_components/angular-mocks/angular-mocks.js",
        "./app/bower_components/angular-*/**/angular-*.js",
        "./app/bower_components/ng*/ng*.js",
        "./app/bower_components/angular-ui-validate/dist/validate.js",
        "./app/bower_components/angular-bootstrap/ui-bootstrap.js",
        "./app/bower_components/oclazyload/dist/ocLazyLoad.js",
        "./app/bower_components/ngSweetAlert/SweetAlert.js",
        "./app/bower_components/AngularJS-Toaster/toaster.js",
        "./app/bower_components/ui-router-extras/release/ct-ui-router-extras.js",
        "./chai.js",
        "./app/scripts/**/*.js",
        "./app/tests/**/*.js",
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'IE', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
        mocha: {
            reporter: "html",
            ui: "bdd",
        }
    },
  })    
}
