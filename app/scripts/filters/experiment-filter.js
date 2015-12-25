'use strict';


angular.module('nevermore')
  .filter('labActiveFilter', function () {
  	return function(active){
			if(active){
		      return "开放"
		    }else{
		      return "关闭"
		    }
  	}

  })
