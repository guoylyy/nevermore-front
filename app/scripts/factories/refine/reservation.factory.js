;void function(){

	angular.module("nevermore")
			.factory("reservationFactory", reservationFactory)

	reservationFactory.$inject = ["$resource", "sessionService", "$rootScope"]

	function reservationFactory($resource, sessionService, $rootScope){
		var apiUrl = base_Url + "/reservation"
		,	headers = sessionService.headers()

		return {
			reservation: reservation,
			myReservationsInWeek: myReservationsInWeek,
			myReservationsOutWeek: myReservationsOutWeek,
			reservations: reservations
		}

		function reservation(){
			return $resource(apiUrl + "/:id", {
				id: "",
			}, {
				post: {
					method: "POST",
					headers:  sessionService.headers(),
				},
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				},
				delete: {
					method: "DELETE",
					headers:  sessionService.headers(),
				}
			})
		}

		function reservations(){
			return $resource(apiUrl + "/reservations?scope=all", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function myReservationsInWeek(){
			return $resource(apiUrl + "/myReservationsInWeek", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function myReservationsOutWeek(){
			return $resource(apiUrl + "/myReservationsOutWeek", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}
	}

}()
