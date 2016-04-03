;void function(){
	angular.module("nevermore")
			.controller("TeacherReserveController", TeacherReserveController)

	TeacherReserveController.$inject = ["$scope", "experimentID", "experimentName",
	"classID", "ExperimentFactory", "InputValidatorFactory", "LabFactory", "StateChainFactory",
	"ReservationFactory", "HttpResponseFactory", "ToasterTool"]

	function TeacherReserveController($scope, experimentID, experimentName,
		classID, ExperimentFactory, InputValidatorFactory, LabFactory, StateChainFactory,
		ReservationFactory, HttpResponseFactory, ToasterTool){
		$scope.date = new Date()

		var stateChain = StateChainFactory.getStateChain()

		stateChain
		.pushState("initState")
		.pushState("date", function(){
			$scope.date = new Date()
		})
		.pushState("lab", function(){
			$scope.lab = undefined
			$scope.labList = []
		})
		.pushState("slot", function(){
			$scope.slot = undefined
			$scope.slotList = []
		})

		$scope.experimentName = experimentName

		$scope.labList = []
		$scope.lab = undefined

		$scope.slotList = []
		$scope.slot = undefined

		$scope.currentDate = getStartTimeOfToday()
		$scope.date = undefined

		$scope.stage = 1

		$scope.labChanged = labChanged
		$scope.dateChanged = dateChanged

		$scope.reserve = reserve

		$scope.next = next
		$scope.prev = prev

		InputValidatorFactory.injectToScope($scope)

		function getStartTimeOfToday(){
			var today = new Date()
			,	year = today.getFullYear()
			,	month = today.getMonth()
			,	date = today.getDate()

			//Date在接受3个参数时，会以0作为默认值填补时分秒的值。
			return (new Date(year, month, date)).valueOf()

		}

		function next(){
			var lastStage = $scope.stage
			$scope.stage += 1

			if(lastStage === 1){
				getLabs()
			}else if(lastStage === 2){
				getSlots($scope.lab.id)
			}
		}

		function prev(){
			$scope.stage -= 1
		}

		function dateChanged(){
			stateChain.resetChain("date")
		}

		function getLabs(){
			return ExperimentFactory.labs().get({
				id: experimentID
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.labList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function labChanged(){
			stateChain.resetChain("lab")
		}

		function getSlots(labID){
			return LabFactory.slots().get({
				id: labID,
				date: formatDate($scope.date)
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.slotList)
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
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
			ReservationFactory.reservation().post({
				personCount: $scope.personCount,
				experimentId: experimentID,
				labId: $scope.lab.id,
				clazzId: classID,
				slotId: $scope.slot.id,
				applyDate: formatDate($scope.date),
				remark: $scope.remark,
			})
			.$promise
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					ToasterTool.success("预约成功")
					$scope.closeThisDialog('success')
				}else{
					errorHandler(response)
				}
			})
			.catch(errorHandler)
		}

		function errorHandler(error){
			if(HttpResponseFactory.isServerResponse(error)){
				var message = HttpResponseFactory.getResponseMessage(error)
				ToasterTool.error(message)
			}else{
				ToasterTool.error("网络连接错误，请重试")
			}
		}
	}
}()
