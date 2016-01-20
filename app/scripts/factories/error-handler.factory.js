;void function(){

	angular.module("nevermore")
		.factory("errorHandlerFactory", errorHandlerFactory)

	errorHandlerFactory.$inject = ["ToasterTool", "httpResponseFactory"]

	function errorHandlerFactory(ToasterTool, httpResponseFactory){
		var COMMON_ERROR_MESSAGE = "网络连接错误，请重试"
		
		return {
			handle: handle,
		}

		function handle(error){
			if(httpResponseFactory.isServerResponse(error)){
				var message = getErrorMessage(error)
				showErrorTip(message)
			}else{
				showErrorTip(COMMON_ERROR_MESSAGE)
			}
		}

		function isServerError(error){
			return httpResponseFactory.isServerResponse(error)
		}

		function getErrorMessage(error){
			return httpResponseFactory.getResponseMessage(error)
		}

		function showErrorTip(errorTip){
			ToasterTool.error(errorTip)
		}
	}

}()