app.controller("VerifiedExperimentAppointmentCtrl", ["$scope", "Reservation",
	"sessionService", "generalService", "ToasterTool", "ngDialog", 
function($scope, Reservation, sessionService, generalService, ToasterTool, ngDialog){
	var DEFAULT_RESOURCE_TEMPLATE = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}

	$scope.resources = angular.copy(DEFAULT_RESOURCE_TEMPLATE)
	$scope.viewResource = viewResource
	$scope.cancelAppointment = function(resource){
		Reservation.cancelReservation().delete({
			resType: "classReservation",
			id: resource.id,
		}).$promise
		.then(function(data){
			loadResources()
			ToasterTool.success("取消预约", "取消预约成功")
		})
		.catch(function(error){
			ToasterTool.error("取消预约", error.toString())
		})
	}
	$scope.pageChanged = loadResources

	loadResources()

	function loadResources(){
		commitLoad(Reservation)
		.then(loadSuccess)
		.then(loadFail)
	}

	function commitLoad(resourceFactory){
		return resourceFactory.allByStatusPage().get({
			semesterId: sessionService.getCurrentSemester().id,
			pageSize: generalService.pageSize(),
			pageNumber: $scope.resources.curPageNum,
			status: "APPROVED",
		}).$promise
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		errorHandler(error)
	}

	function viewResource(resource){
		var dialog = ngDialog.open({
			"template": "tpl/app/admin/modal/view-experiment-appointment.html",
			"controller": "ViewExperimentAppointmentCtrl",
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				data: function(){
					return resource
				},
				labTeachers: function(){
					return Reservation.reservationLabTeachers().get({
						id: resource.id,
					}).$promise
				}
			},
		})
	}

	function onVerify(){
		loadResources()
		ToasterTool.success("审核实验", "审核实验成功")
	}

	function onReject(){
		loadResources()
		ToasterTool.success("拒绝实验", "拒绝实验成功")
	}

	function errorHandler(error){
		var errorMessage = getErrorMessage(error)
		showErrorTip(errorMessage)
	}

	function getErrorMessage(error){
		if(typeof error === "object"){
			return error.errorCode || error.toString()
		}else if (error === undefined){
			return "服务器开小差了"
		}else{
			return error.toString()
		}
	}

	function showErrorTip(error){
		ToasterTool.error(error)
	}
}])