;void function(){
	angular.module("nevermore")
			.controller("ReservationController", ReservationController)

	ReservationController.$inject = ["$scope", "reservationFactory", "ngDialog",
		"httpResponseFactory", "ToasterTool", "generalService", "errorHandlerFactory"]

	function ReservationController($scope, reservationFactory, ngDialog,
		httpResponseFactory, ToasterTool, generalService, errorHandlerFactory){

		var errorHandler = errorHandlerFactory.handle

		$scope.reservationInWeekList = []
		$scope.reservationOutWeekList = []
		$scope.paginator = {
			page: 1,
			items: undefined,
			itemsPerPage: generalService.pageSize(),
		}

		$scope.pageChanged = pageChanged
		$scope.cancelReservation = cancelReservation
		$scope.viewReservation = viewReservation

		getReservationsInWeek()
		getReservationOutWeek()

		function getReservationsInWeek(){
			reservationFactory.myReservationsInWeek().get()
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.reservationInWeekList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function getReservationOutWeek(){
			reservationFactory.myReservationsOutWeek().get({
				pageNum: $scope.paginator.page,
				pageSize: $scope.paginator.itemsPerPage,
			})
			.$promise
			.then(function(response){
				if(httpResponseFactory.isResponseSuccess(response)){
					var data = httpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.reservationOutWeekList)
					var paginator = httpResponseFactory.getResponsePaginator(response)
					angular.copy(paginator, $scope.paginator)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
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

		function viewReservation(reservation){
			var dialog = ngDialog.open({
				"template": "tpl/app/admin/modal/view-experiment-appointment.html",
				"controller": "ViewExperimentAppointmentCtrl",
				"closeByDocument": true,
				"closeByEscape": true,
				"resolve": {
					data: function(){
						return reservationFactory.reservation().get({
							id: reservation.id
						}).$promise;
					}
				},
			})
		}

		function pageChanged(){
			getReservationOutWeek()
		}
	}

}()
