;void function(){

	angular.module("nevermore")
		.factory("InputValidator", InputValidator)

	function InputValidator(){
		return {
			injectToScope: injectToScope,
		}

		function injectToScope($scope){
			$scope.validatePhoneNumber = validatePhoneNumber
			$scope.validateSelect = validateSelect
			$scope.validateString = validateString
			$scope.validateNonEmptyString = validateNonEmptyString
		}
	}

	function validatePhoneNumber(phoneNumber){
		var validator = new RegExp("^(13\\d|14[57]|15\\d|17[0678]|18\\d)\\d{8}$")
		return validator.test(phoneNumber)
	}

	function validateSelect(selectValue){
		if(selectValue === "" || selectValue === null){
			return false
		}else{
			return true
		}
	}

	function validateString(content){
		if(typeof content === "string"){
			return true
		}else{
			return false
		}
	}

	function validateNonEmptyString(content){
		if(validateString(content) === false){
			return false
		}
		if(content === ""){
			return false
		}
		return true
	}
}()