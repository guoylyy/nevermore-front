'use strict';

angular.module('nevermore')
  .factory('loadingInterceptor', function loadingHttpInterceptor($q, $timeout) {
    return {
      request: function (config) {
        $.isLoading();
        return config || $q.when(config);
      },
      requestError: function (config) {
        $timeout(function () {
          $.isLoading('hide');
        }, 300);
        return $q.reject(rejection);
      },
      response: function (response) {
        $timeout(function () {
          $.isLoading('hide');
        }, 300);
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        $timeout(function () {
          $.isLoading('hide');
        }, 300);
        return $q.reject(rejection);
      }
    };
  });
