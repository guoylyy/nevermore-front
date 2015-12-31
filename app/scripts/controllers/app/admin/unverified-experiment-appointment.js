app.controller("UnverifiedExperimentAppointmentCtrl", ["$scope", "Reservation",
	"sessionService", "generalService", "ToasterTool", "ngDialog",
function($scope, Reservation, sessionService, generalService, ToasterTool, ngDialog){
	var DEFAULT_RESOURCE_TEMPLATE = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}

	$scope.resources = angular.copy(DEFAULT_RESOURCE_TEMPLATE)
	$scope.verifyResource = verifyResource
	$scope.pageChanged = loadResources

	loadResources()

	function loadResources(){
		commitLoad(Reservation)
		.then(loadSuccess)
		.then(loadFail)
	}

	function commitLoad(resourceFactory){
		return resourceFactory.allByStatusPage().get({
			semesterId: sessionService.getCurrSemeter().id,
			pageSize: generalService.pageSize(),
			pageNumber: $scope.resources.curPageNum,
			status: "PENDING",
		}).$promise
	}

	function loadSuccess(data){
		angular.copy(data, $scope.resources)
	}

	function loadFail(error){
		errorHandler(error)
	}

	function verifyResource(resource){
		var dialog = ngDialog.open({
			"template": "tpl/app/admin/modal/verify-experiment-appointment.html",
			"controller": "VerifyExperimentAppointmentCtrl",
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
			}else if(data.value === MODIFY_ACTION){
				onReject()
			}
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
		}else{
			return error.toString()
		}
	}

	function showErrorTip(error){
		ToasterTool.error(error)
	}
}])