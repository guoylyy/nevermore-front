;void function(){

	angular.module("nevermore")
			.factory("messageFactory", messageFactory)

	messageFactory.$inject = ["$resource", "sessionService", "$rootScope"]

	function messageFactory($resource, sessionService, $rootScope){
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
					headers: headers
				}
			})
		}

		function message(){
			return $resource(apiUrl + "/message/:id", {
				id: '@id'
			}, {
				get: {
					method: "GET",
					headers: headers
				},
				put: {
					method: "PUT",
					headers: headers
				},
				delete: {
					method: "DELETE",
					headers: headers
				}
			})
		}
	}

}()
