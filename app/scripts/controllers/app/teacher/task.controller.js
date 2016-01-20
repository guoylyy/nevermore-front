;void function(){
	angular.module("nevermore")
			.controller("TeacherTaskController", TeacherTaskController)

	TeacherTaskController.$inject = ["$scope", "ClazzFactory"]

	function TeacherTaskController($scope, ClazzFactory){

		$scope.experimentList = []

		loadExperimentReservations()

		//获取实验预约列表
		function loadExperimentReservations(){
		 ClazzFactory.experiments().get({
			 id:$scope.class.id,
			 type: 'reservations'
		 }).$promise
			 .then(function(response){
					if(response.success){
						angular.copy(response.data, $scope.experimentList);
					}else{
						console.log('error');
					}
			 });
		}
	}
}()
