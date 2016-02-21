'use strict';

app.controller('ProfileIconController', ['$scope', 'Upload', 'ResTool', 'ToasterTool', 'sessionService',
function ($scope, Upload, ResTool, ToasterTool, sessionService) {
  // 这里上传头像
  $scope.upload = function (dataUrl) {
    Upload.upload({
              url: base_Url+'/account/icon',
              data: {
                file: Upload.dataUrltoBlob(dataUrl, $scope.picFile.name)
              },
              headers: sessionService.headers()
            })
    .then(
      function(data) {
        var data = data.data;
        if (data.success) {
          ToasterTool.success("更新头像成功");
          $scope.closeThisDialog('success');
        } else {
          ToasterTool.error("上传头像失败。")
        }
      }
    )
  }
}
]);
