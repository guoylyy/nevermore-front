/**
 * 教师的实验和预约控制器
 */

;void function(){
	angular.module("nevermore")
			.controller("TeacherReservationController", TeacherReservationController)

	TeacherReservationController.$inject = ["$scope", "reservationFactory", 
		"httpResponseFactory", "ToasterTool", "generalService"]

	function TeacherReservationController($scope, reservationFactory, 
		httpResponseFactory, ToasterTool, generalService){


		$scope.reservationInWeekList = []
		$scope.reservationOutWeekList = []
		$scope.paginator = {
			page: 1,
			items: undefined,
			itemsPerPage: generalService.pageSize(),
		}

		$scope.pageChanged = pageChanged
		$scope.cancelReservation = cancelReservation

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

		function errorHandler(error){
			if(httpResponseFactory.isServerResponse(error)){
				var message = httpResponseFactory.getResponseMessage(error)
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
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

		function pageChanged(){
			getReservationOutWeek()
		}
	}

}()
