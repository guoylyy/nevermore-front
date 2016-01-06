chai.should()
var expect = chai.expect
chai.should()



describe("Input Validator", function(){
	beforeEach(module("nevermore"))
	var InputValidator = undefined

	beforeEach(inject(function(_InputValidator_){
		InputValidator = _InputValidator_
	}))

	var $scope = {}
	$scope = InputValidator.injectToScope($scope)

	describe("validatePhoneNumber", function(){
		it("should pass when given 13681622894", function(){
			var phoneNumber = "13681622894"
			$scope.validatePhoneNumber(phoneNumber).should.be.true
		})

		it("should pass when given 15212345678", function(){
			var phoneNumber = "15212345678"
			$scope.validatePhoneNumber(phoneNumber).should.be.true
		})

		it("should pass when given 18916012345", function(){
			var phoneNumber = "18916012345"
			$scope.validatePhoneNumber(phoneNumber).should.be.true
		})

		it("should fail when given whatthefuck which is wtf", function(){
			var phoneNumber = "whatthefuck"
			$scope.validatePhoneNumber(phoneNumber).should.be.false
		})

		it("should fail when given 1368162289 which is too short", function(){
			var phoneNumber = "1368162289"
			$scope.validatePhoneNumber(phoneNumber).should.be.false
		})

		it("should fail when given 136816228943 which is too long", function(){
			var phoneNumber = "136816228943"
			$scope.validatePhoneNumber(phoneNumber).should.be.false
		})

		it("should fail when given 12312345678 which is unvalid", function(){
			var phoneNumber = "12312345678"
			$scope.validatePhoneNumber(phoneNumber).should.be.false
		})

		it("should fail when given 136816w2894 which have letter", function(){
			var phoneNumber = "136816w2894"
			$scope.validatePhoneNumber(phoneNumber).should.be.false
		})
	})

	describe("validateSelect", function(){
		it("should pass when not given quotes", function(){
			var selectValue = {}
			$scope.validateSelect(selectValue).should.be.true
		})

		it("should fail when given null", function(){
			var selectValue = null
			$scope.validateSelect(selectValue).should.be.false
		})

		it("should fail when given empty string", function(){
			var selectValue = ""
			$scope.validateSelect(selectValue).should.be.false
		})
	})
})