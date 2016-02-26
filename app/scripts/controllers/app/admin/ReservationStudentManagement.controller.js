
app.controller("ReservationStudentManagementController", ["$scope", "$stateParams", "ReservationManageFactory",
	"sessionService", "generalService", "ToasterTool", "ngDialog", "ManagementService", "AlertTool",
	function($scope, $stateParams, ReservationManageFactory, sessionService, generalService,
		ToasterTool, ngDialog, ManagementService, AlertTool) {

			$scope.addStudentReservation = addStudentReservation;

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
