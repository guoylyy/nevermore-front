app.controller("RichModifyCourseCtrl", ["$scope", "data", "CourseManage", "AlertTool",
	function($scope, data, CourseManage, AlertTool) {
		
		var originResource = data,
			copiedResource = angular.copy(originResource);
		// TODO: 通过course info api获取course主页信息

		$scope.richContent = '';
		$scope.pending = false;
		$scope.richModifyCourse = richModifyCourse;

		function richModifyCourse () {
			// TODO: 通过course info api更新course主页信息

			commitContent(content)
			$scope.closeThisDialog("modify")
		}

		function commitContent(content){
			content = content || ""
			return
		}
	}
]);
