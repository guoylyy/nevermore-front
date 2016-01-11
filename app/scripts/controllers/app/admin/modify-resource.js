;void function(){
	angular.module("nevermore")
		.controller("ModifyResourceCtrl", ModifyResourceCtrl)

	ModifyResourceCtrl.$inject = ["$scope", "data", "commitModify",
		"InputValidator", "ErrorHandler"]

	function ModifyResourceCtrl($scope, data, commitModify,
		InputValidator, ErrorHandler){

		var originResource = data
		,	copiedResource = angular.copy(originResource)

		$scope.resource = copiedResource
		$scope.pending = false
		$scope.modifyResource = modifyResource
		$scope.errorMessage = ""

		InputValidator.injectToScope($scope)

		function modifyResource(){
			$scope.pending = true
			removeErrorTip()
			commitModify(copiedResource)
			.then(updateLocalResource)
			.then(function(){
				$scope.closeThisDialog("success")
			})
			.catch(errorHandler)
		}

		function removeErrorTip(){
			$scope.errorTip = ""
		}

		function updateLocalResource(){
			angular.copy(copiedResource, originResource)
		}

		function errorHandler(error){
			$scope.pending = false
			var errorMessage = ErrorHandler.getErrorMessage(error)
			$scope.errorMessage = errorMessage
		}
	}
}()