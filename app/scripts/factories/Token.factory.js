;
void
function() {
	"use strict";

	angular.module("nevermore")
		.factory("TokenFactory", TokenFactory);

	TokenFactory.$inject = ["$resource", "$localStorage"]

	function TokenFactory($resource, $localStorage) {

		var apiUrl = base_Url + "/account";
		var token = $localStorage.token;

		return {
			getTokenHeader: getTokenHeader,
			login: login,
			isLogin: isLogin,
			isValid: isValid,
		};

		function getTokenHeader() {
			return {
				'x-auth-token': token
			};
		}

		function login(headers) {
			return $resource(apiUrl + "/authentication", null, {
				'post': {
					method: 'POST',
					headers: headers
				}
			});
		}

		function isLogin(headers) {
			return $resource(base_Url + '/api/token/isLogin', null, {
				'get': {
					method: 'GET',
					headers: headers
				}
			});
		}

		function isValid(userName, token) {
			var headers = {
				"X-Username": userName,
				"X-Auth-Token": token,
			}

			return $resource(apiUrl + "/authentication", null, {
				"get": {
					method: "GET",
					headers: headers,
				}
			})
		}
	}
}();