;void function(){

	angular.module("nevermore")
			.controller("ExperimentDetailController", ExperimentDetailController)

	ExperimentDetailController.$inject = ["$scope", "experiment", "clazz", "currentUser"]

	function ExperimentDetailController($scope, experiment, clazz, currentUser){
		$scope.experiment = experiment
		$scope.clazz = clazz
		$scope.currentUser = currentUser
	}

}()