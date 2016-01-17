app.controller("RichModifyCourseCtrl", ["$scope", "data", "CourseManage", "ManagementService", "AlertTool",
	function($scope, data, CourseManage, ManagementService, AlertTool) {
		
		var originResource = data,
			copiedResource = angular.copy(originResource);
		// TODO: 通过course info api获取course主页信息

		$scope.richContent = '';
		$scope.pending = false;
		$scope.richModifyCourse = richModifyCourse;

		function richModifyCourse () {
			// TODO: 通过course info api更新course主页信息
			$scope.closeThisDialog("modify")
		}
	}
]);
