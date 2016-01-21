;void function(){
	angular.module("nevermore")
			.controller("TeacherTaskReportController", TeacherTaskReportController)

	TeacherTaskReportController.$inject = ["$scope", "$stateParams", "ClazzFactory"]

	function TeacherTaskReportController($scope, $stateParams, ClazzFactory){
		var clazzId = $scope.class.id
		var expId = $stateParams.expId;

		$scope.reportList = []

		$scope.finishList = []
		$scope.unFinishList = []

		$scope.changeStatus = changeStatus
		$scope.viewReportDetails = viewReportDetails

		loadReportList()

		function loadReportList(){
			ClazzFactory.experimentReports().get(
				{
					id: clazzId,
					expId: expId
				}
			).$promise
			 .then(function(response){
				 if(response.success){
						splitListStatusOfList(response.data);
				 }
			 });
		}

		function splitListStatusOfList(list){
			var finishList = [];
			var unFinishList = [];
			if(list.length > 0){
				for(var index in list){
					if(list[index].status.code === 'FINISH'){
						finishList.push(list[index]);
					}else{
						unFinishList.push(list[index]);
					}
				}
			}
			angular.copy(finishList, $scope.finishList);
			angular.copy(unFinishList, $scope.unFinishList);
			changeStatus('FINISH');
		}

		function changeStatus(status){
			var st = status || 'FINISH';
			if(st === 'FINISH'){
				angular.copy($scope.finishList, $scope.reportList);
			}else{
				angular.copy($scope.unFinishList, $scope.reportList);
			}
		}

		function viewReportDetails(record){
			alert('还没有完成')
		}

	}
}()
