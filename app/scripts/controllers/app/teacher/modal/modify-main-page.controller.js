;void function(){

	angular.module("nevermore")
			.controller("ModifyMainPageController", ModifyMainPageController)

	ModifyMainPageController.$inject = ["$scope", "data", "CourseManage"]

	function ModifyMainPageController($scope, data, CourseManage){

		$scope.content = data
		$scope.modifyContent = modifyContent

		function modifyContent(){
			//提交

			$scope.closeThisDialog("modify")
		}

	}

}()