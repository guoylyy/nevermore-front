;void function(){
	angular.module("nevermore")
			.controller("StudentFileController", StudentFileController)

	StudentFileController.$inject = ["$scope", "ClazzFactory", "HttpResponseFactory",
		"ToasterTool", "Upload", "sessionService", "ErrorHandlerFactory"]

	function StudentFileController($scope, ClazzFactory, HttpResponseFactory,
		ToasterTool, Upload, sessionService, ErrorHandlerFactory){
		
		var errorHandler = ErrorHandlerFactory.handle

		$scope.publicFileList = []
		$scope.privateFileList = []

		$scope.selectedTab = 'CLAZZ_PUBLIC'
		$scope.remove = removeFileFromClazz

		getPublicFiles()
		getPrivateFiles()

		$scope.$watch('file', function () {
			$scope.uploadFile($scope.file);
		});

		$scope.table = [];
		$scope.changeTab = function(tab){
			$scope.selectedTab = tab;
		}

		$scope.uploadFile = function (file) {
			if($scope.selectedTab === "CLAZZ_PUBLIC"){
				return
			}
			if(file) {
				Upload.upload({
					url: base_Url+'/file/upload',
					method: 'POST',
					headers: sessionService.headers(),
					data: {},
					file: file
				}).then (function (response) {
					if (response.data.success){
						relateFileAndClazz(response.data.data, $scope.class.id);
					}
				}, function (response) {
					ToasterTool.warning("文件上传失败!");
				});
			}
		};

		//关联文件
		function relateFileAndClazz(file, clazzId){
			ClazzFactory.file().post({id:clazzId}, {
				attachId: file.id,
				type: $scope.selectedTab
			}).$promise
			.then(function(response){
				if(response.success){
					ToasterTool.success("文件上传成功!");
					refreshList()
				}else{
					ToasterTool.warning("文件上传失败!");
				}
			});
		}

		function removeFileFromClazz(file){
			ClazzFactory.removeFile().delete({
				id : $scope.class.id,
				fileId : file.id,
				type: $scope.selectedTab
			},{})
			.$promise
			.then(function(response){
				if(response.success){
					ToasterTool.success("移除文件成功!");
					refreshList()
				}
			});
		}

		//获取共有文件
		function getPublicFiles(){
			var fileType = "CLAZZ_PUBLIC"

			getFiles(fileType)
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.publicFileList)
				}else{
					throw new Error(response)
				}
			})
			.catch(errorHandler)
		}

		//获取私有文件
		function getPrivateFiles(){
			var fileType = "CLAZZ_PRIVATE"
			getFiles(fileType)
			.then(function(response){
				if(HttpResponseFactory.isResponseSuccess(response)){
					var data = HttpResponseFactory.getResponseData(response)
					angular.copy(data, $scope.privateFileList)
				}else{
					throw new Error(response)
				}
			})
			.catch(errorHandler)
		}

		//访问文件列表接口
		function getFiles(fileType){
			return ClazzFactory.files().get({
				id: $scope.class.id,
				type: fileType
			}).$promise
		}

		//刷新当前列表
		function refreshList(){
			if($scope.selectedTab === 'CLAZZ_PUBLIC'){
				getPublicFiles();
			}else{
				getPrivateFiles();
			}
		}
	}
	
}()