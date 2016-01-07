;void function(){
	angular.module("nevermore")
		.factory("ErrorHandler", ErrorHandler)

	ErrorHandler.$inject = ["ToasterTool"]

	function ErrorHandler(ToasterTool){
		return {
			handle: handle,
			getErrorMessage: getErrorMessage,
		}
	}

	function handle(error){
		var errorMessage = getErrorMessage(error)
		showErrorTip(errorMessage)
	}

	function getErrorMessage(error){
		if(typeof error === "object"){
			return error.errorCode || error.toString()
		}else{
			return error.toString()
		}
	}

	function showErrorTip(error){
		ToasterTool.error(error)
	}
}()