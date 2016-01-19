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
			$scope.validateRangeNumber = validateRangeNumber
			$scope.validateRangeNumberInclusive = validateRangeNumberInclusive
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

	function validateRangeNumber(number, min, max){
		if(validateNumber(number) === false){
			return false
		}

		if(typeof min !== "number"){
			min = Infinity * -1
		}

		if(typeof max !== "number"){
			max = Infinity
		}

		if(min < number && number < max){
			return true
		}else{
			return false
		}
	}

	function validateRangeNumberInclusive(number, min, max){
		if(validateNumber(number) === false){
			return false
		}

		if(typeof min !== "number"){
			min = Infinity * -1
		}

		if(typeof max !== "number"){
			max = Infinity
		}

		if(min <= number && number <= max){
			return true
		}else{
			return false
		}
	}

	function validateNumber(number){
		var validator = new RegExp("^\\d+$")

		if(validator.test(number) === true){
			return true
		}else{
			return false
		}
	}
}()