'use strict';

app.controller('ProfileIconCtrl', ['$scope', 'Upload', 'ResTool', 'ToasterTool', 'sessionService',
function ($scope, Upload, ResTool, ToasterTool, sessionService) {
  // 这里上传头像
  $scope.upload = function (dataUrl) {
    Upload.upload({
              url: base_Url+'/file/upload',
              data: {
                file: Upload.dataUrltoBlob(dataUrl, $scope.picFile.name)
              },
              headers: sessionService.headers()
            })
    .then(
      function(data) {
        var data = data.data;
        if (data.success) {
          $scope.closeThisDialog(data.data.id);
        } else {
          ToasterTool.error("上传头像失败。")
        }
      }
    )
  }
}
]);
