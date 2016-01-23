'use strict';

angular.module('nevermore')
  .filter('messagePreview', function() {
    return function(text) {
      //控制字符的长度
      if (text.length > 30) {
        return text.substring(0, 22) + "..." + text.substring(text.length - 5);
      } else {
        return text;
      }
    };
  });
