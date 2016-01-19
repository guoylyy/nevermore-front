;void function(){
	angular.module("nevermore")
			.controller("TeacherReserveController", TeacherReserveController)

	TeacherReserveController.$inject = ["$scope", "experimentID", "experimentName", "experiment",
	"InputValidator", "lab", "StateChainFactory"]

	function TeacherReserveController($scope, experimentID, experimentName, experiment,
		InputValidator, lab, StateChainFactory){
		$scope.date = new Date()
		var stateChain = StateChainFactory.getStateChain()
		stateChain.pushState("initState")

		.pushState("date", function(){
			$scope.date = new Date()
		}).pushState("lab", function(){
			if(!$scope.lab){
				$scope.lab = undefined
				$scope.labList = []
			}
		}).pushState("slot", function(){
			$scope.slot = undefined
			$scope.slotList = []
		})
		$scope.experimentName = experimentName

		$scope.labList = []
		$scope.lab = undefined

		$scope.slotList = []
		$scope.slot = undefined

		$scope.currentDate = Date.now()
		$scope.date = undefined

		$scope.stage = 1

		$scope.labChanged = labChanged
		$scope.dateChanged = dateChanged

		$scope.reserve = reserve

		$scope.next = next
		$scope.prev = prev

		InputValidator.injectToScope($scope)

		function next(){
			var lastStage = $scope.stage
			$scope.stage += 1
			$scope.$broadcast("nmStageNext")

			if(lastStage === 1){
				getLabs()
				.then(function(data){
					if(data.success === true){
						angular.copy(data.data, $scope.labList)
					}
				})
				.catch(function(error){
					alert(error)
				})
			}else if(lastStage === 2){
				getSlots($scope.lab.id)
				.then(function(data){
					if(data.success === true){
						angular.copy(data.data, $scope.slotList)
					}
				})
				.catch(function(error){
					alert(error)
				})
			}
		}

		function prev(){
			$scope.stage -= 1
			$scope.$broadcast("nmStagePrev")
		}

		function dateChanged(){
			stateChain.resetChain("date")
		}

		function getLabs(){
			return experiment.labs().get({
				id: experimentID
			}).$promise
		}

		function labChanged(){
			stateChain.resetChain("lab")
		}

		function getSlots(labID){
			return lab.slots().get({
				id: labID,
				date: formatDate($scope.date)
			}).$promise
		}

		function formatDate(date){
			var year = date.getFullYear()
			var month = appendZero(date.getMonth() + 1)
			var day = appendZero(date.getDate())

			return year + "-" + month + "-" + day

			function appendZero(num){
				var numString = num.toString()
				var numLength =numString.length

				if(numLength === 1){
					return "0" + numString
				}else{
					return numString
				}
			}
		}

		function reserve(){
			console.log()
		}
	}
}()
