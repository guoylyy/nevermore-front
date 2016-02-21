;void function(){
	angular.module("nevermore")
		.controller("StudentVirtualExperimentDetailController", StudentVirtualExperimentDetailController);

	StudentVirtualExperimentDetailController.$inject = ["$scope", "trainRecords"];

	function StudentVirtualExperimentDetailController($scope,trainRecords){
		$scope.trainRecords = trainRecords;
	}
}();
