/**
 * 预约审核控制类
 *
 * @param  {[type]} "RservationVerifyCtrl" [description]
 * @param  {[type]} ["$scope"              [description]
 * @param  {[type]} "Account"              [description]
 * @param  {[type]} "data"                 [description]
 * @param  {[type]} "Reservation"          [description]
 * @param  {[type]} function($scope,       Account,      data, Reservation [description]
 * @return {[type]}                        [description]
 */
app.controller("RservationVerifyCtrl", ["$scope", "Account", "data", "Reservation",
function($scope, Account, data, Reservation){
	var originResource = data
	,	copiedResource = angular.copy(originResource)

	$scope.resource = copiedResource

	$scope.step = 1
	$scope.assignTeacher = function(){
		$scope.step = 2
	}
	$scope.previousStep = function(){
		$scope.step = 1
	}
	$scope.verifyAppointment = function(){
		$scope.errorTip = ""
		var assignedTeacherList = []
		for(var i = 0 ; i < $scope.teacherList.length ; i++){
			if($scope.teacherList[i].chosen === 1){
				assignedTeacherList.push($scope.teacherList[i].data.id)
			}
		}
		if(assignedTeacherList.length === 0){
			$scope.errorTip = "必须选取实验教师"
			return
		}
		Reservation.verify().post({
			id: copiedResource.id,
			status: "APPROVED",
			teacherIds: assignedTeacherList,
		}, {}).$promise
		.then(function(data){
			if(data.errorCode === "NO_ERROR"){
				$scope.closeThisDialog("verify")
			}
		})
		.catch(function(){
			$scope.errorTip = data.errorCode
		})
	}

	$scope.rejectAppointment = function(){
		Reservation.verify().post({
			id: copiedResource.id,
			status: "REJECTED",
			teacherIds: [],
		}, {}),$promise
		.then(function(data){
			if(data.errorCode === "NO_ERROR"){
				$scope.closeThisDialog("reject")
			}
		})
		.catch(function(){
			$scope.errorTip = data.errorCode
		})
	}

	Account.all().get({
		userType: "ALL_TEACHER",
	}).$promise.then(function(data){
		var teacherList = []
		for(var i = 0 ; i < data.data.length ; i++){
			teacherList.push({
				data: data.data[i],
				chosen: 0,
			})
		}
		$scope.teacherList = teacherList
	})
}])
