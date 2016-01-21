/**
 * 获取一个班级下所有学生的实验记录列表
 * @return {[type]} [description]
 */
;void function(){
	angular.module("nevermore")
			.controller("TeacherTaskDetailController", TeacherTaskDetailController)

	TeacherTaskDetailController.$inject = ["$scope", "$stateParams", "ClazzFactory",
			"ngDialog"]

	function TeacherTaskDetailController($scope, $stateParams, ClazzFactory,
			ngDialog){
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
				console.log(record);
				var dialog = ngDialog.open({
					template: 'tpl/app/modal/experiment-detail.html',
					controller: 'ExperimentDetailController',
					className: 'nm-dialog nm-dialog-md',
					closeByDocument: false,
					closeByEscape: true,
					resolve: {
						record: function(){
							return ClazzFactory.experimentRecord().get({
								id: clazzId,
								expId: expId,
								recordId: record.record.id
							}).$promise
						}
					}
				});
			}

	}
}()
