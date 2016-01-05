;void function(){

	angular.module("nevermore")
		.factory("StateChainFactory", StateChainFactory)


	function StateChainFactory(){
		return {
			getStateChain: getStateChain,
		}

		function getStateChain(){
			return new StateChain()
		}
	}

	function StateChain(){
		var chain = []
		var self = this

		this.pushState = pushState
		this.resetChain = resetChain
		this.clearChain = clearChain


		//================== for testing ===================
		this.getChain = function(){
			return chain
		}

		function pushState(name, listener){
			if(hasState(name) === true || checkState(name) === false){
				return self
			}

			var state = generateState(name, listener)
			addState(state)

			return self
		}

		function hasState(name){
			var findState = false

			angular.forEach(chain, function(value){
				if(value.name === name){
					findState = true
				}
			})

			return findState
		}

		function checkState(name){
			if(name === undefined || name === null){
				return false
			}
			return true
		}

		function generateState(name, listener){
			return {
				name: name,
				listener: listener,
			}
		}

		function addState(state){
			chain.push(state)
		}

		function clearChain(){
			triggerBreakEvent(chain)
			chain = []
		}

		function resetChain(name){
			var stateIndex = getStateIndex(name)
			var cuttedStateChain = sliceStateChain(stateIndex)
			triggerBreakEvent(cuttedStateChain)
		}

		function getStateIndex(name){
			var stateIndex = -1

			angular.forEach(chain, function(value, key){
				if(value.name === name){
					stateIndex = key
				}
			})

			if(stateIndex === -1){
				throw new Error("undefined state name")
			}

			return stateIndex
		}

		function sliceStateChain(stateIndex){
			if(stateIndex === chain.length - 1){
				return []
			}
			return chain.slice(stateIndex + 1)
		}

		function triggerBreakEvent(chain){
			angular.forEach(chain, function(state){
				if(typeof state.listener === "function"){
					state.listener()
				}
			})
		}
	}
}()
