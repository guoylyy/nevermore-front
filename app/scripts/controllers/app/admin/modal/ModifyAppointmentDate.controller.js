;
void
function() {
	angular.module("nevermore")
		.controller("ModifyAppointmentDateController", ModifyAppointmentDateController)

	ModifyAppointmentDateController.$inject = ["$scope", "reservationID", "labID"
	, "LabFactory", "InputValidatorFactory", "StateChainFactory", "ReservationFactory"
	, "HttpResponseFactory", "ToasterTool", "AccountManageFactory", "DateTool"]

	function ModifyAppointmentDateController($scope, reservationID, labID
		, LabFactory, InputValidatorFactory, StateChainFactory, ReservationFactory
		, HttpResponseFactory, ToasterTool, AccountManageFactory, DateTool){
		$scope.date = new Date()

		var stateChain = StateChainFactory.getStateChain()

		stateChain
		.pushState("initState")
		.pushState("date", function(){
			$scope.date = new Date()
		})
		.pushState("slot", function(){
			$scope.slot = undefined
			$scope.slotList = []
		})
		.pushState("teacher", function(){
			$scope.availableTeachers = []
			$scope.selectedTeachers = []
		})

		$scope.slotList = []
		$scope.slot = undefined

		$scope.currentDate = getStartTimeOfToday()
		$scope.date = undefined

		$scope.availableTeachers = []
		$scope.selectedTeachers = []

		$scope.stage = 1

		$scope.dateChanged = dateChanged
		$scope.slotChanged = slotChanged
		$scope.modifyAppointmentDate = modifyAppointmentDate		

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
			$scope.$broadcast("nmStageNext")

			if(lastStage === 1){
				getSlots(labID)
			}else if(lastStage === 2){
				getTeachers($scope.slot)
			}
		}

		function prev(){
			$scope.stage -= 1
			$scope.$broadcast("nmStagePrev")
		}

		function dateChanged(){
			stateChain.resetChain("date")
		}

		function slotChanged(){
			stateChain.resetChain("slot")
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

		function getTeachers(slot){
			AccountManageFactory.freeLabTeachers().get({
				slotId: $scope.slot.id,
				date: DateTool.format(new Date($scope.date))
			}).$promise.then(function(rcData) {
				if (rcData.success) {
					var lst = getLabels(rcData.data);
					angular.copy(lst, $scope.availableTeachers);
					$scope.selectedTeachers = []
				}
			})
		}

		function getLabels(tList) {
			var teacherList = []
			for (var i = 0; i < tList.length; i++) {
				teacherList.push({
					label: tList[i].account + ' ' + tList[i].name,
					id: tList[i].id
				})
			}
			return teacherList;
		}

		function modifyAppointmentDate(){
			ReservationFactory.reservation().put({
				id: reservationID,
			}, {
				slotId: $scope.slot.id,
				applyDate: formatDate($scope.date),
				teachers: $scope.selectedTeachers.map(function(teacher){
					return {
						id: teacher.id,
					}
				}),
			})
			.$promise
			.then(function(response){
				if(response.success){
					$scope.closeThisDialog("success")
				}else{
					$scope.closeThisDialog("failed")
				}
			})
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