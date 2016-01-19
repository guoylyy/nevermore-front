;void function(){
	angular.module("nevermore")
			.controller("TeacherAppointmentController", TeacherAppointmentController)

	TeacherAppointmentController.$inject = ["$scope", "Exp",
		"ToasterTool", "Lab", "Reservation", "ngDialog", "clazzFactory"]

	function TeacherAppointmentController($scope, Exp,
		ToasterTool, Lab, Reservation, ngDialog, clazzFactory){


		$scope.experimentList = []

		$scope.getTotalReservationPersonCount = getTotalReservationPersonCount

		$scope.openReserveDialog = openReserveDialog


		loadExperimentReservations();

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

		//
		function openReserveDialog(experimentIndex){
			var experiment = $scope.experimentList[experimentIndex]

			var reserveDialog = ngDialog.open({
				template: "/tpl/app/teacher/modal/add-reservation.html",
				controller: "TeacherReserveController",
				className: 'nm-dialog nm-dialog-md',
				closeByDocument: true,
				closeByEscape: true,
				resolve: {
					experimentID: function() {
						return experiment.id
					},
					experimentName: function(){
						return experiment.name
					},
					classID: function(){
						return $scope.classID
					}
				}
			})
		}

		function getTotalReservationPersonCount(experiment){
			var reservations = experiment.reservations
			var totalPersonCount = 0

			if(Array.isArray(reservations) === false){
				return 0
			}

			angular.forEach(reservations, function(reservation){
				totalPersonCount += reservation.personCount
			})

			return totalPersonCount
		}
	}

}()
