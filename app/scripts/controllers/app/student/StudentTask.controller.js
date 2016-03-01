;
void
function() {
	angular.module("nevermore")
		.controller("StudentTaskController", StudentTaskController)

	StudentTaskController.$inject = ["$scope", "ClazzFactory", "ExperimentFactory",  "HttpResponseFactory",
		"ErrorHandlerFactory", "ngDialog", "AlertTool"
	]

	function StudentTaskController($scope, ClazzFactory, ExperimentFactory, HttpResponseFactory,
		ErrorHandlerFactory, ngDialog, AlertTool) {

		var errorHandler = ErrorHandlerFactory.handle

		var startTime = {}

		var endTime = {}

		$scope.experimentList = []
		$scope.viewRecordDetails = viewRecordDetails
		$scope.viewVirtualExperimentDetail = viewVirtualExperimentDetail
		$scope.startVirtualExperiment = startVirtualExperiment
		$scope.endVirtualExperiment = endVirtualExperiment

		loadExperimentReservations()

		//获取实验预约列表
		function loadExperimentReservations() {
			ClazzFactory.experiments().get({
					id: $scope.class.id,
					type: "student",
				})
				.$promise
				.then(function(response) {
					if (HttpResponseFactory.isResponseSuccess(response)) {
						var data = HttpResponseFactory.getResponseData(response)
						
						angular.copy(data, $scope.experimentList)
					} else {
						errorHandler(response)
					}
				})
				.catch(errorHandler)
		}


		function viewRecordDetails(record, experiment) {
			var dialog = ngDialog.open({
				template: "tpl/app/modal/experiment-detail.html",
				controller: "ExperimentDetailController",
				className: "nm-dialog nm-dialog-md",
				closeByDocument: false,
				closeByEscape: true,
				resolve: {
					record: function() {
						return ClazzFactory.experimentRecord().get({
							id: $scope.class.id,
							expId: experiment.id,
							recordId: record.id
						}).$promise
					}
				}
			});
		}

		function viewVirtualExperimentDetail(trainRecords){
			var dialog = ngDialog.open({
				template: "tpl/app/modal/StudentVirtualExperimentDetail.html",
				controller: "StudentVirtualExperimentDetailController",
				className: "nm-dialog nm-dialog-md",
				closeByDocument: false,
				closeByEscape: true,
				resolve: {
					trainRecords: function(){
						return trainRecords;
					}
				}
			});
		}

		//记录虚拟实验开始
		function startVirtualExperiment(experiment){
			startTime[experiment.id] = new Date();
			AlertTool.warning({title:'提示',text:experiment.name+"虚拟实验已开始，请不要关闭或离开当前页面，否则将无法记录实验信息"}).then(function() {
			});
		}

		//完成虚拟实验
		function endVirtualExperiment(experiment){
			endTime[experiment.id] = new Date();
			if (!startTime[experiment.id]) {
				AlertTool.error({title:'失败',text:"未开始虚拟实验，请先点击开始虚拟实验"}).then(function() {
				});
			}else {
				var trainData = {
					'experimentId':experiment.id,
					'remark':"",
					'clazzId':$scope.class.id,
					'startTime':startTime[experiment.id],
					'endTime':endTime[experiment.id],
					'accountId':$scope.currentUser.id
				}
				ExperimentFactory.experimentTrain().post(trainData).$promise.then(function(response){
					if (response.code == "200") {
						AlertTool.success({title:'提交成功！',text:''}).then(function() {});
					}
					else {
						AlertTool.error({title:'失败',text:response.message}).then(function() {
						});
					}
				})

			}

		}
	}

}()
