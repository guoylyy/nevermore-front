app.controller("RservationAppointmentCtrl", ["$scope", "$stateParams", "ReservationManage",
	"sessionService", "generalService", "ToasterTool", "ngDialog", "ManagementService", "AlertTool",
function($scope, $stateParams, ReservationManage, sessionService, generalService,
	ToasterTool, ngDialog, ManagementService, AlertTool){
  var status = $stateParams.status;
	if(status === 'verified'){
		status = 'APPROVED';
	}else if(status === 'unverified'){
		status = 'APPLY';
	}

	$scope.resources = angular.copy(ManagementService.DEFAULT_RESOURCE_TEMPLATE)
	$scope.verifyResource = verifyResource
	$scope.viewResource = viewResource
	$scope.pageChanged = loadResources

	loadResources()

	function loadResources(){
		commitLoad(ReservationManage)
		.then(loadSuccess)
		.then(loadFail)
	}

	function commitLoad(resourceFactory){
		return resourceFactory.page().get({
			pageSize: $scope.resources.paginator.itemsPerPage,
			pageNum: $scope.resources.paginator.page,
			status: status
		}).$promise
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		if(error == undefined){
			return "";
		}
		errorHandler(error)
	}

	$scope.cancelAppointment = function(resource){
		AlertTool.deleteConfirm({title:'是否确定取消该预约',subtitle:'取消后将不可恢复'}).then(function(isConfirm) {
		  if(isConfirm) {
				ReservationManage.reservation().delete({
					id: resource.id,
				}).$promise
				.then(function(data){
					if(data.success){
						loadResources()
						ToasterTool.success("取消预约", "取消预约成功")
					}else{
						ToasterTool.error(data.message);
					}
				})
				.catch(function(error){
					ToasterTool.error("取消预约", error.toString())
				})
		    AlertTool.close()
		  }
		})
	}

	function verifyResource(resource){
		var dialog = ngDialog.open({
			"template": "tpl/app/admin/modal/verify-experiment-appointment.html",
			"controller": "RservationVerifyCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				"data": function(){
					return resource
				},
			},
		})

		dialog.closePromise.then(function(data){
			var VERIFY_ACTION = "verify"
			var REJECT_ACTION = "reject"
			if(data.value === VERIFY_ACTION){
				onVerify()
			}else if(data.value === REJECT_ACTION){
				onReject()
			}
		})
	}

	function viewResource(resource){
		var dialog = ngDialog.open({
			"template": "tpl/app/admin/modal/view-experiment-appointment.html",
			"controller": "ViewExperimentAppointmentCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				data: function(){
					return ReservationManage.reservation().get({
						id: resource.id
					}).$promise;
				}
			},
		})
	}

	function onVerify(){
		loadResources()
		ToasterTool.success("已同意该实验预约")
	}

	function onReject(){
		loadResources()
		ToasterTool.success("拒绝实验预约成功")
	}

	function errorHandler(error){
		var errorMessage = getErrorMessage(error)
		showErrorTip(errorMessage)
	}

	function getErrorMessage(error){
		if(typeof error === "object"){
			return error.errorCode || error.toString()
		}else{
			return "发生错误";
		}
	}

	function showErrorTip(error){
		ToasterTool.error(error)
	}
}]);
