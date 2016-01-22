;void function(){
	angular.module("nevermore")
			.controller("StudentTaskController", StudentTaskController)

	StudentTaskController.$inject = ["$scope", "ClazzFactory", "httpResponseFactory",
		"errorHandlerFactory", "ngDialog"]

	function StudentTaskController($scope, ClazzFactory, httpResponseFactory,
		errorHandlerFactory, ngDialog){

		var errorHandler = errorHandlerFactory.handle

		$scope.experimentList = []
		$scope.openExperimentDetailDialog = openExperimentDetailDialog

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

		function openExperimentDetailDialog(experiment){
			var dialog = ngDialog.open({
				"template": "tpl/app/modal/experiment-detail.html",
				"controller": "ExperimentDetailController",
				"className": 'nm-dialog nm-dialog-md',
				"closeByDocument": true,
				"closeByEscape": true,
				"resolve": {
					"experiment": function(){
						return experiment
					},
					"clazz": function(){
						return $scope.class
					},
					"currentUser": function(){
						return $scope.currentUser
					}
				},
			})
		}
	}

}()
