app.controller("ReservationManagementController", ["$scope", "$state", "$stateParams", "ReservationManageFactory",
	"sessionService", "generalService", "ToasterTool", "ngDialog", "ManagementService", "AlertTool",
	function($scope, $state, $stateParams, ReservationManageFactory, sessionService, generalService,
		ToasterTool, ngDialog, ManagementService, AlertTool) {
		var status = $stateParams.status;
		if (status === 'verified') {
			status = 'APPROVED';
		} else if (status === 'unverified') {
			status = 'APPLY';
		} else if (status === 'student-verify'){
			$state.go('app.admin-appointment.student');
		}

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


		$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
		$scope.verifyResource = verifyResource
		$scope.viewResource = viewResource
		$scope.pageChanged = loadResources
		$scope.filterConditionChange = filterConditionChange
		$scope.modifyAppointmentDate = modifyAppointmentDate

		if(status === 'verified' || status === 'unverified'){
				loadResources();
		}

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
				isExpired: $scope.selectCondition.code
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

		$scope.cancelAppointment = function(resource) {
			AlertTool.deleteConfirm({
				title: '是否确定取消该预约',
				subtitle: '取消后将不可恢复'
			}).then(function(isConfirm) {
				if (isConfirm) {
					ReservationManageFactory.reservation().delete({
							id: resource.id,
						}).$promise
						.then(function(data) {
							if (data.success) {
								loadResources()
								ToasterTool.success("取消预约", "取消预约成功")
							} else {
								ToasterTool.error(data.message);
							}
						})
						.catch(function(error) {
							ToasterTool.error("取消预约", error.toString())
						})
					AlertTool.close()
				}
			})
		}

		function filterConditionChange(condition) {
			$scope.selectCondition = condition
			loadResources()
		}

		function verifyResource(resource) {
			var dialog = ngDialog.open({
				"template": "tpl/app/admin/modal/verify-experiment-appointment.html",
				"controller": "VerifyReservationController",
				"closeByDocument": true,
				"closeByEscape": true,
				"resolve": {
					"data": function() {
						return resource
					},
				},
			})

			dialog.closePromise.then(function(data) {
				var VERIFY_ACTION = "verify"
				var REJECT_ACTION = "reject"
				if (data.value === VERIFY_ACTION) {
					onVerify()
				} else if (data.value === REJECT_ACTION) {
					onReject()
				}
			})
		}

		function viewResource(resource) {
			var dialog = ngDialog.open({
				"template": "tpl/app/admin/modal/view-edit-experiment-appointment.html",
				"controller": "ViewAndEditReservationController",
				"closeByDocument": true,
				"closeByEscape": true,
				"className": 'nm-dialog nm-dialog-md',
				"resolve": {
					data: function() {
						return ReservationManageFactory.reservation().get({
							id: resource.id
						}).$promise;
					}
				},
			})
		}

		function onVerify() {
			loadResources()
			ToasterTool.success("已同意该实验预约")
		}

		function onReject() {
			loadResources()
			ToasterTool.success("拒绝实验预约成功")
		}

		function errorHandler(error) {
			var errorMessage = getErrorMessage(error)
			showErrorTip(errorMessage)
		}

		function getErrorMessage(error) {
			if (typeof error === "object") {
				return error.errorCode || error.toString()
			} else {
				return "发生错误";
			}
		}

		function showErrorTip(error) {
			ToasterTool.error(error)
		}

		function modifyAppointmentDate(resource) {
			var reserveDialog = ngDialog.open({
				template: "/tpl/app/admin/modal/modify-appointment-date.html",
				controller: "ModifyAppointmentDateController",
				className: 'nm-dialog nm-dialog-md',
				closeByDocument: true,
				closeByEscape: true,
				resolve: {
					"labID": function(){
						return resource.lab.id;
					},
					"reservationID": function(){
						return resource.id;
					}
				}
			})

			reserveDialog.closePromise.then(function(data) {
				if (data.value === 'success') {
					loadResources()
					ToasterTool.success("更改成功")
				}else if(data.value === "failed"){
					ToasterTool.error("更改失败")
				}
			})
		}
	}
]);
