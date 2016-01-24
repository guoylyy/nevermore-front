;void function(){

	angular.module("nevermore")
			.controller("ExperimentDetailController", ExperimentDetailController)

	ExperimentDetailController.$inject = ["$scope", "record", "experiment", "ToasterTool",
									"ngDialog"]

	function ExperimentDetailController($scope, record, experiment, ToasterTool,
								ngDialog){

			$scope.record = record.data;
			$scope.viewScriptPicture = viewScriptPicture;

			var imageList = [];
			for(var i = 0; i < record.data.recordImages.length; i++){
					var image = record.data.recordImages[i];
					imageList.push({thumb: image.url, img: image.url});
			}
			$scope.images = imageList;

			//根据附件获取附件相关
			function viewScriptPicture(attach){
				var attachId = attach.id;
				experiment.extractPicture().get({
					attachId: attachId
				}).$promise
				.then(function(data){
					if(data.success){
						//显示图表
						showPictureDialog(data.data);
					}else{
						ToasterTool.error("发生错误", data.message);
					}
				})
			}

			function showPictureDialog(url){
				var diloag = ngDialog.open({
					"template": "tpl/app/modal/view-picture.html",
					"controller": "ViewPictureController",
					"className": 'nm-dialog nm-dialog-md',
					"closeByDocument": true,
					"closeByEscape": true,
					"resolve": {
						url: function(){
							return url
						}
					}
				});
			}
	}



}()
