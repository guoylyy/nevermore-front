;void function(){

	angular.module("nevermore")
			.controller("ExperimentDetailController", ExperimentDetailController)

	ExperimentDetailController.$inject = ["$scope", "record"]

	function ExperimentDetailController($scope, record){

			$scope.record = record;

			console.log(record);


	}

}()
