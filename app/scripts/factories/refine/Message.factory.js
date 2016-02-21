;void function(){

	angular.module("nevermore")
			.factory("MessageFactory", MessageFactory)

	MessageFactory.$inject = ["$resource", "sessionService", "$rootScope"]

	function MessageFactory($resource, sessionService, $rootScope){
		var apiUrl = base_Url
		,	headers = sessionService.headers()

		return {
			messages: messages,
			message: message
		}

		function messages(){
			return $resource(apiUrl + "/messages", {}, {
				get: {
					method: "GET",
					headers: sessionService.headers()
				}
			})
		}

		function message(){
			return $resource(apiUrl + "/message/:id", {
				id: '@id'
			}, {
				get: {
					method: "GET",
					headers: sessionService.headers()
				},
				put: {
					method: "PUT",
					headers: sessionService.headers()
				},
				delete: {
					method: "DELETE",
					headers: sessionService.headers()
				}
			})
		}
	}

}()
