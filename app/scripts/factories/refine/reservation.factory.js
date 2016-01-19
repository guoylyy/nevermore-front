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
		}

		function reservation(){
			return $resource(apiUrl + "/:id", {
				id: "",
			}, {
				post: {
					method: "POST",
					headers: headers,
				},
				get: {
					method: "GET",
					headers: headers,
				},
				delete: {
					method: "DELETE",
					headers: headers,
				}
			})
		}

		function myReservationsInWeek(){
			return $resource(apiUrl + "/myReservationsInWeek", null, {
				get: {
					method: "GET",
					headers: headers,
				}
			})
		}

		function myReservationsOutWeek(){
			return $resource(apiUrl + "/myReservationsOutWeek", null, {
				get: {
					method: "GET",
					headers: headers,
				}
			})
		}
	}

}()