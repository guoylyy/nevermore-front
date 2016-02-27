
app.controller("ReservationStudentManagementController", ["$scope", "$stateParams", "ReservationManageFactory",
	"sessionService", "generalService", "ToasterTool", "ngDialog", "ManagementService", "AlertTool",
	function($scope, $stateParams, ReservationManageFactory, sessionService, generalService,
		ToasterTool, ngDialog, ManagementService, AlertTool) {

			$scope.addStudentReservation = addStudentReservation;
			$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)

			$scope.pageChanged = loadResources

			$scope.verifyStatusList = [{
				code: false,
				isActive: true,
				value: "未过期的"
			}, {
				code: true,
				isActive: false,
				value: "已过期的"
			}]
			$scope.selectCondition = $scope.verifyStatusList[0];


			loadResources();

			function loadResources() {
				commitLoad(ReservationManageFactory)
					.then(loadSuccess)
					.then(loadFail)
			}

			function commitLoad(resourceFactory) {
				return resourceFactory.page().get({
					pageSize: $scope.resources.paginator.itemsPerPage,
					pageNum: $scope.resources.paginator.page,
					status: status,
					isExpired: $scope.selectCondition.code,
					types:['CLASS_RESERVATION']
				}).$promise
			}

			function loadSuccess(data) {
				angular.copy(data, $scope.resources)
			}

			function loadFail(error) {
				if (error == undefined) {
					return "";
				}
				errorHandler(error)
			}

			function addStudentReservation(){
				//弹出添加个人预约的模态框
				var reserveDialog = ngDialog.open({
					template: "/tpl/app/admin/modal/add-student-reservation.html",
					controller: "AddStudentReservationController",
					className: 'nm-dialog nm-dialog-md',
					closeByDocument: true,
					closeByEscape: true
				});
			}
	}
]);
