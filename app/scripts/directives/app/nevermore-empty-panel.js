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
        scope.type = attrs.type;
        if(scope.type == 'message'){
            scope.url = 'images/app/common/message_blank.png';
        }else{
            scope.url = 'images/app/common/nodata.png';
        }
        if(!scope.text){
          scope.text = '暂时没有任何数据';
        }
      }
    };
  }
);
