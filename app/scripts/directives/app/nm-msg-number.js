;void function() {
  angular.module('nevermore')
  .directive('nmMsgNumber', ['$rootScope', '$interval', 'MessageFactory', function ($rootScope, $interval, MessageFactory) {
      return {
        restrict: 'EA',
        template:'<b class="badge badge-sm up pull-right-xs bg-danger">{{msgNumber}}</b>',
        link: function(scope, el) {
          $rootScope.msgNumber = 0;

          function updateMsgNumber() {
            MessageFactory.messages().get({
              operation: "count",
              isRead: false,
            }).$promise
            .then(function(data) {
              if (data.success) {
                $rootScope.msgNumber = data.data;
              }
            });
          }

          function restartTimer() {
            if(angular.isDefined($rootScope.msgTimer)) {
              $interval.cancel($rootScope.msgTimer);
              delete $rootScope.msgTimer;
            }
            $rootScope.msgTimer = $interval(function () {
              updateMsgNumber();
            }, 60000);
          }

          updateMsgNumber();
          restartTimer();

          scope.$on('$destroy', function() {
            if(angular.isDefined($rootScope.msgTimer)) {
              $interval.cancel($rootScope.msgTimer);
              delete $rootScope.msgTimer;
            }
          });
        }
      }
    }
  ])
  .service('nmMsgNumberService', ['$rootScope', '$interval', 'MessageFactory', function ($rootScope, $interval, MessageFactory) {
    this.updateMsgNumber = function () {
      MessageFactory.messages().get({
        operation: "count",
        isRead: false,
      }).$promise
      .then(function(data) {
        if (data.success) {
          $rootScope.msgNumber = data.data;
        }
      });
    };

    this.clearTimer = function () {
      if(angular.isDefined($rootScope.msgTimer)) {
        $interval.cancel($rootScope.msgTimer);
        delete $rootScope.msgTimer;
      }
    };
  }]);
}()
