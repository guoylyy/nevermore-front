;void function(){
	angular.module("nevermore")
			.controller("TeacherAppointmentController", TeacherAppointmentController)

	TeacherAppointmentController.$inject = ["$scope", "ToasterTool", "ngDialog",
		"ClazzFactory", "errorHandlerFactory", "httpResponseFactory", "reservationFactory", 
		"AlertTool"]

	function TeacherAppointmentController($scope, ToasterTool, ngDialog,
		ClazzFactory, errorHandlerFactory, httpResponseFactory, reservationFactory, 
		AlertTool){

		var errorHandler = errorHandlerFactory.handle

		$scope.experimentList = []
		$scope.getTotalReservationPersonCount = getTotalReservationPersonCount
		$scope.openReserveDialog = openReserveDialog
		$scope.cancelReservation = cancelReservation

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

		//打开预约面板
		function openReserveDialog(experiment){
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

			reserveDialog.closePromise.then(function(data){
				if(data.value === 'success'){
					loadExperimentReservations()
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

		function cancelReservation(reservation){
			AlertTool.confirm({title:'您确定要取消这个预约?'}).then(function(isConfirm) {
			  if(isConfirm) {
					reservationFactory.reservation().
						delete({id:reservation.id})
						.$promise
						.then(function(response){
							if(response.success){
								ToasterTool.success('取消预约成功!');
								loadExperimentReservations()
							}else{
								ToasterTool.error('错误',response.message);
							}
						});
			    AlertTool.close();
			  }
			});
		}
	}

}()
