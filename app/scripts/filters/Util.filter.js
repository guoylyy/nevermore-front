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



  angular.module('nevermore')
  .filter('bytes', function() {
  	return function(bytes, precision) {
  		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
  		if (typeof precision === 'undefined') precision = 1;
  		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
  			number = Math.floor(Math.log(bytes) / Math.log(1024));
  		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
  	}
  });
