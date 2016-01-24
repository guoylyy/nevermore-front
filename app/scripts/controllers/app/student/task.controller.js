;void function(){
	angular.module("nevermore")
			.controller("StudentTaskController", StudentTaskController)

	StudentTaskController.$inject = ["$scope", "ClazzFactory", "httpResponseFactory",
		"errorHandlerFactory", "ngDialog"]

	function StudentTaskController($scope, ClazzFactory, httpResponseFactory,
		errorHandlerFactory, ngDialog){

		var errorHandler = errorHandlerFactory.handle

		$scope.experimentList = []
		$scope.viewRecordDetails = viewRecordDetails

		loadExperimentReservations()

		//获取实验预约列表
		function loadExperimentReservations(){
			ClazzFactory.experiments().get({
			 	id:$scope.class.id,
			 	type: 'student',
		 	})
		 	.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.experimentList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}


		function viewRecordDetails(record, experiment){
				var dialog = ngDialog.open({
					template: 'tpl/app/modal/experiment-detail.html',
					controller: 'ExperimentDetailController',
					className: 'nm-dialog nm-dialog-md',
					closeByDocument: false,
					closeByEscape: true,
					resolve: {
						record: function(){
							return ClazzFactory.experimentRecord().get({
								id: $scope.class.id,
								expId: experiment.id,
								recordId: record.id
							}).$promise
						}
					}
				});
			}
	}

}()
