/**
 * 统一的 Angular Resource 调用工具
 */
angular.module('nevermore')
  .service('ResTool', ['$sessionStorage', '$q', function($sessionStorage, $q) {
    var TOKEN_KEY = "X-Auth-Token";

    function successHandler(deferred, value, responseHeaders) {
      var headers = responseHeaders ? responseHeaders() : {};

      value['headers'] = headers;
      deferred.resolve(value);
    }

    function errorHandler(deferred, httpResponse) {
      //TODO: 统一错误处理
      deferred.resolve(httpResponse);
    }

    /**
     * 添加Token到请求头部
     * @param {Object} headers
     * @return {Object}
     */
    function addToken(headers) {
      headers[TOKEN_KEY] = $sessionStorage[TOKEN_KEY] || null;
      return headers;
    }

    this.setToken = function(token) {
      $sessionStorage[TOKEN_KEY] = token;
    };

    this.getToken = function () {
      return $sessionStorage[TOKEN_KEY] || null;
    };

    /**
     * GET Method
     */
    this.httpGet = function(resource, params, headers) {
      var deferred = $q.defer();

      resource(headers || {}).get(params,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    this.httpGetWithToken = function(resource, params, headers) {
      var deferred = $q.defer();

      resource(addToken(headers || {})).get(params,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    /**
     * POST Method
     */
    this.httpPost = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(headers || {}).post(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    this.httpPostWithToken = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(addToken(headers || {})).post(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    /**
     * PUT Method
     */
    this.httpPut = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(headers || {}).put(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    this.httpPutWithToken = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(addToken(headers || {})).put(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    /**
     * DELETE Method
     */
    this.httpDelete = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(headers || {}).delete(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };

    this.httpDeleteWithToken = function(resource, params, body, headers) {
      var deferred = $q.defer();

      resource(addToken(headers || {})).delete(params, body,
        function success(value, responseHeaders) {
          successHandler(deferred, value, responseHeaders);
        },
        function error(httpResponse) {
          errorHandler(deferred, httpResponse);
        });

      return deferred.promise;
    };
  }]);
