'use strict';

angular.module('nevermore')
  .directive('nevermoreEmptyPanel', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'tpl/app/blocks/empty-panel.html',
      scope: '=',
      link: function(scope, element, attrs){
        scope.text = attrs.text;
        scope.url = 'images/app/common/message_blank.png';
      }
    };
  }
);
