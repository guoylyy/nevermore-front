;void function(){

	angular.module("nevermore")
			.controller("ExperimentDetailController", ExperimentDetailController)

	ExperimentDetailController.$inject = ["$scope", "record"]

	function ExperimentDetailController($scope, record){

			$scope.record = record.data;
			var imageList = [];
			for(var i = 0; i < record.data.recordImages.length; i++){
					var image = record.data.recordImages[i];
					imageList.push({thumb: image.url, img: image.url});
			}
			$scope.images = imageList;
	}

}()
