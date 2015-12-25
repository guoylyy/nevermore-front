'use strict';


angular.module('nevermore')
  .filter('activeFilter', function () {
  	return function(active){
			if(active){
		      return "开放"
		    }else{
		      return "关闭"
		    }
  	}

  })
