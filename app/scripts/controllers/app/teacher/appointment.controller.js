;void function(){
	angular.module("nevermore")
			.controller("TeacherAppointmentController", TeacherAppointmentController)

	TeacherAppointmentController.$inject = ["$scope", "ToasterTool", "ngDialog",
		"ClazzFactory", "errorHandlerFactory", "httpResponseFactory", "reservationFactory"]

	function TeacherAppointmentController($scope, ToasterTool, ngDialog,
		ClazzFactory, errorHandlerFactory, httpResponseFactory, reservationFactory){

		var errorHandler = errorHandlerFactory.handle

		$scope.experimentList = []
		$scope.getTotalReservationPersonCount = getTotalReservationPersonCount
		$scope.openReserveDialog = openReserveDialog
		$scope.cancelReservation = cancelReservation


		loadExperimentReservations();

		//获取实验预约列表
		function loadExperimentReservations(){
		 	ClazzFactory.experiments().get({
				id:$scope.class.id,
			 	type: 'reservations'
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
						return $scope.class.id
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

		function cancelReservation(reservationID){
			reservationFactory.reservation().delete({
				id: reservationID,
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					ToasterTool.success("取消预约成功")
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}
	}

}()
