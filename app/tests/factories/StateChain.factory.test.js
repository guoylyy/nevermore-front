chai.should()
var expect = chai.expect

describe("State Chain", function() {
	var StateChainFactory = undefined

	beforeEach(module("nevermore"))
	beforeEach(inject(function(_StateChainFactory_){
		StateChainFactory = _StateChainFactory_
	}))

	describe("pushState", function(){
		it("should not add state when name is undefined", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState(undefined, function(){})
			var chain = stateChain.getChain()
			chain.should.have.length(0)
		})

		it("should not add state when name is null", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState(null, function(){})
			var chain = stateChain.getChain()
			chain.should.have.length(0)
		})

		it("should add state when name is correct", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState("init", function(){})
			var chain = stateChain.getChain()
			chain.should.have.length(1)
			stateChain.pushState("second")
			chain = stateChain.getChain()
			chain.should.have.length(2)
		})
	})

	describe("clearChain", function(){
		it("should clear chain when chain is empty", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.clearChain()
			var chain = stateChain.getChain()
			chain.should.have.length(0)
		})

		it("should clear chain when chain is not empty", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState("init")
			stateChain.clearChain()
			var chain = stateChain.getChain()
			chain.should.have.length(0)
		})
	})

	describe("resetChain", function(){
		it("should reset the chain after the spec state", function(){
			var array = []
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState("first", function(){
				array.push("first")
			})
			stateChain.pushState("second", function(){
				array.push("second")
			})
			stateChain.pushState("third", function(){
				array.push("third")
			})
			stateChain.pushState("fourth", function(){
				array.push("fourth")
			})
			stateChain.resetChain("second")
			expect(["third", "fourth"]).to.eql(["third", "fourth"])
		})

		it("should throw error when the state is undefined", function(){
			var stateChain = StateChainFactory.getStateChain()
			stateChain.pushState("first")
			stateChain.pushState("second")
			stateChain.pushState("third")
			stateChain.pushState("fourth")
			expect(function(){
				stateChain.resetChain("secondlalala")
			}).to.throw("undefined state name")
		})
	})
});