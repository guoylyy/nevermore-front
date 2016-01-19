;void function(){
	angular.module("nevermore")
			.controller("TeacherTaskController", TeacherTaskController)

	TeacherTaskController.$inject = ["$scope", "clazzFactory"]

	function TeacherTaskController($scope, clazzFactory){

		$scope.experimentList = []

		loadExperimentReservations()

		//获取实验预约列表
		function loadExperimentReservations(){
		 clazzFactory.experiments().get({
			 id:$scope.classID,
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
