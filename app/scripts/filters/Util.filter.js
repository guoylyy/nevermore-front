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

  angular.module('nevermore')
  .filter('trainTimeSpan', function() {
    return function(trainRecords) {
      var seconds = 0;
      angular.forEach(trainRecords, function(data){
        seconds = seconds + data.estimatedTime;
      });
      var minute = seconds / 60;
      var hour = minute / 60;
      minute = minute % 60;
      return hour + '小时' + minute +'分钟';
    }
  });
