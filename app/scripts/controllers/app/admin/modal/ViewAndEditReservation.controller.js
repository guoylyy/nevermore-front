app.controller("ViewAndEditReservationController", ["$scope", "AccountManageFactory",
	"data", "ReservationManageFactory", "AlertTool", "DateTool", "ToasterTool",
	function($scope, AccountManageFactory, data, ReservationManageFactory, AlertTool,
		DateTool, ToasterTool) {
		$scope.resource = data.data
		$scope.availableTeachers = []
		$scope.selectedTeachers = []
		$scope.saveTeacherList = saveTeacherList

		concreteTeacherList();


		$scope.step = 1
		$scope.viewTeacher = function() {
			$scope.step = 2
		}
		$scope.viewExperiment = function() {
			$scope.step = 1
		}

		//save
		function saveTeacherList() {
			if ($scope.selectedTeachers.length == 0) {
				ToasterTool.error("您至少选中一个实验教师");
			} else {
				//构建新的教师 id
				var idList = [];
				angular.forEach($scope.selectedTeachers, function(data) {
						idList.push(data.id)
					})
					//提交
				ReservationManageFactory.verify().put({
					id: $scope.resource.id
				}, {
					teacherIds: idList
				}).$promise.
				then(function(data) {
					if (data.success) {
						ToasterTool.success("更新实验教师成功");
						$scope.closeThisDialog();
					}
				})
			}
		}

		//构建实验教师
		function concreteTeacherList() {
			AccountManageFactory.freeLabTeachers().get({
				slotId: $scope.resource.slot.id,
				date: DateTool.format(new Date($scope.resource.applyDate))
			}).$promise.then(function(rcData) {
				if (rcData.success) {
					var lst = getLabels(rcData.data);
					angular.copy(lst, $scope.availableTeachers);
					angular.copy(getLabels($scope.resource.teachers), $scope.selectedTeachers);
				}
			})
		}

		function getLabels(tList) {
			var teacherList = []
			for (var i = 0; i < tList.length; i++) {
				teacherList.push({
					label: tList[i].account + ' ' + tList[i].name,
					id: tList[i].id
				})
			}
			return teacherList;
		}

	}
])