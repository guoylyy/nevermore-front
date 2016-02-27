;void function(){

	angular.module("nevermore")
			.factory("ReservationFactory", ReservationFactory)

	ReservationFactory.$inject = ["$resource", "sessionService", "$rootScope"]

	function ReservationFactory($resource, sessionService, $rootScope){
		var apiUrl = base_Url + "/reservation"
		,	headers = sessionService.headers()

		return {
			reservation: reservation,
			myReservationsInWeek: myReservationsInWeek,
			myReservationsOutWeek: myReservationsOutWeek,
			reservations: reservations,
			studentReservationStudents: studentReservationStudents,
			availableStudentReservation: availableStudentReservation,
			studentAllReservation: studentAllReservation,
			studentReservation: studentReservation,
			labTeacherTasks: labTeacherTasks
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
				},
				put: {
					method: "PUT",
					headers: sessionService.headers(),
				},
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

		function labTeacherTasks(){
			return $resource(apiUrl + "/labTeacherTasks?scope=all", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function studentReservationStudents(){
			return $resource(apiUrl + "/:reservationId/students", {
				reservationId: '@reservationId'
			}, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function availableStudentReservation(){
			return $resource(apiUrl + "/availableStudentReservation", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function studentAllReservation(){
			return $resource(apiUrl + "/studentReservation", null, {
				get: {
					method: "GET",
					headers:  sessionService.headers(),
				}
			})
		}

		function studentReservation(){
			return $resource(apiUrl + "/student/:reservationId", {
				reservationId: '@reservationId'
			}, {
				post: {
					method: "POST",
					headers:  sessionService.headers(),
				},
				delete: {
					method: "DELETE",
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
