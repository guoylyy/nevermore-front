;void function(){
	angular.module("nevermore")
			.controller("TeacherAppointmentController", TeacherAppointmentController)

	TeacherAppointmentController.$inject = ["$scope", "Exp",
		"ToasterTool", "Lab", "Reservation", "ngDialog"]

	function TeacherAppointmentController($scope, Exp,
		ToasterTool, Lab, Reservation, ngDialog){

		var experimentList = mockAppointmentData.data
		$scope.experimentList = experimentList


		$scope.getTotalReservationPersonCount = getTotalReservationPersonCount

		$scope.openReserveDialog = openReserveDialog

		function openReserveDialog(experimentIndex){
			var experiment = experimentList[experimentIndex]

			var reserveDialog = ngDialog.open({
				template: "/tpl/app/teacher/modal/reserve.html",
				controller: "TeacherReserveController",
				className: 'nm-dialog nm-dialog-sm',
				closeByDocument: true,
				closeByEscape: true,
				resolve: {
					experimentID: function() {
						return experiment.id
					},
				}
			})
		}

		function getTotalReservationPersonCount(experiment){
			var reservations = experiment.reservations
			var totalPersonCount = 0

			if(Array.isArray(reservations) === false){
				return 0
			}

			angular.forEach(reservations, function(reservation){
				totalPersonCount += reservation.personCount
			})

			return totalPersonCount
		}

		function testGetLabs(experimentID){
			Exp.labs().get({
				id: experimentID
			}).$promise.
			then(function(data){
				console.log(data, experimentID)
			}).catch(function(error){
				console.log(error, experimentID)
			})
		}

		function testGetSlots(labID, date){
			Lab.slots().get({
				id: labID,
				date: date,
			}).$promise
			.then(function(data){
				console.log(data, "labID: " + labID + ",date: " + date)
			})
			.catch(function(error){
				console.log(error, "labID: " + labID + ",date: " + date)
			})
		}

		function testReserve(reservation){
			Reservation.reservation().post(reservation).$promise
			.then(function(data){
				console.log(data, reservation.remark)
			})
			.catch(function(error){
				console.log(error, reservation.remark)
			})
		}
	}

	var mockAppointmentData = 
	{
	  "code": "200",
	  "message": "操作成功",
	  "data": [
	    {
	      "id": 1,
	      "createTime": 1426522200000,
	      "modifyTime": 1427163823000,
	      "active": true,
	      "maxStuNum": 80,
	      "minStuNum": 1,
	      "name": "水泵特性曲线测定实验",
	      "number": "0015000230160",
	      "virtualExpLink": "",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    },
	    {
	      "id": 2,
	      "createTime": 1426522217000,
	      "modifyTime": 1427164463000,
	      "active": true,
	      "maxStuNum": 80,
	      "minStuNum": 1,
	      "name": "平板附面层实验",
	      "number": "0002650230180",
	      "virtualExpLink": "",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    },
	    {
	      "id": 3,
	      "createTime": 1426468537000,
	      "modifyTime": 1428382257000,
	      "active": true,
	      "maxStuNum": 80,
	      "minStuNum": 1,
	      "name": "应变电测原理(本部)",
	      "number": "001500021009*",
	      "virtualExpLink": "http://lx-lab.tongji.edu.cn/web/subject2/VTm_lab_exprmnt01.htm",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    },
	    {
	      "id": 4,
	      "createTime": 1426468552000,
	      "modifyTime": 1427164640000,
	      "active": true,
	      "maxStuNum": 16,
	      "minStuNum": 1,
	      "name": "明渠多功能水力学实验",
	      "number": "0015000230140",
	      "virtualExpLink": "",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    },
	    {
	      "id": 5,
	      "createTime": 1426468566000,
	      "modifyTime": 1427164669000,
	      "active": true,
	      "maxStuNum": 80,
	      "minStuNum": 1,
	      "name": "流体横向绕流圆柱体实验",
	      "number": "0015000230190",
	      "virtualExpLink": "",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    },
	    {
	      "id": 6,
	      "createTime": 1426522200000,
	      "modifyTime": 1427164699000,
	      "active": true,
	      "maxStuNum": 80,
	      "minStuNum": 1,
	      "name": "雷诺实验",
	      "number": "0002650231050",
	      "virtualExpLink": "",
	      "extParams": null,
	      "expCount": 0,
	      "expFinishCount": 0,
	      "reportCount": 0,
	      "reportFinishCount": 0,
	      "reservations": [
	        {
	          "id": null,
	          "number": null,
	          "personCount": null,
	          "experiment": null,
	          "lab": null,
	          "account": null,
	          "clazz": null,
	          "slot": null,
	          "applyDate": null,
	          "remark": null,
	          "status": null,
	          "teachers": null
	        }
	      ]
	    }
	  ],
	  "success": true
	}
	
}()