/**
 * 获取一个班级下所有学生的实验记录列表
 * @return {[type]} [description]
 */
;void function(){
	angular.module("nevermore")
			.controller("TeacherTaskDetailController", TeacherTaskDetailController)

	TeacherTaskDetailController.$inject = ["$scope", "$stateParams", "ClazzFactory"]

	function TeacherTaskDetailController($scope, $stateParams, ClazzFactory){
			var clazzId = $scope.class.id
			var expId = $stateParams.expId;  //TODO: 发送请求拿到实验信息

			$scope.recordList = []

			$scope.finishList = []
			$scope.unFinishList = []

			$scope.changeStatus = changeStatus
			$scope.viewRecordDetails = viewRecordDetails

			loadRecordList()

			function loadRecordList(){
				ClazzFactory.experimentRecords().get(
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
					angular.copy($scope.finishList, $scope.recordList);
				}else{
					angular.copy($scope.unFinishList, $scope.recordList);
				}
			}

			function viewRecordDetails(record){
				alert('还没有完成')
			}

	}
}()
