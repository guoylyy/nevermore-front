'use strict';
/**
 * loading 动画加载
 * 	~ 暂时没有启用
 * @param  {[type]} 'nevermore' [description]
 * @return {[type]}             [description]
 */
angular.module('nevermore')
  .factory('loadingInterceptor', function loadingHttpInterceptor($q, $timeout, SystemService
    ,$location, ToasterTool) {
    return {
      request: function (config) {
        return config || $q.when(config);
      },
      requestError: function (config) {
        return $q.reject(rejection);
      },
      response: function (response) {
        if(response.data.code != undefined && response.data.code == '502'){
          SystemService.logout();
          $location.path('/signin');
          ToasterTool.info("会话失效","请重新登录");
        }
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        return $q.reject(rejection);
      }
    };
  });
