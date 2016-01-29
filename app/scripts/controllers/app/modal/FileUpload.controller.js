'use strict';

app.controller('FileUploadController', ['$scope', 'Upload', 'ResTool', 'ToasterTool', 'AlertTool','sessionService', 'classId',
  function ($scope, Upload, ResTool, ToasterTool, AlertTool, sessionService, classId) {
    var URLS = [
      'http://up.qiniu.com',
      'http://up-z0.qiniu.com',
      'http://upload.qiniu.com'
    ];

    $scope.$watch('file', function () {
      $scope.uploadFile($scope.file);
    });

    $scope.table = [];

    $scope.uploadFile = function (file) {
      if(file) {
        Upload.upload({
            url: base_Url+'/api/account/list',
            method: 'POST',
            headers: sessionService.headers(),
            data: {
                class: classId
            },
            file: file
        }).then (function (response) {
            if (response.data.errorCode == "NO_ERROR"){
              $scope.table.push({'studentNum':response.data.data.length});
            }
        }, function (response) {
          ToasterTool.warning("导入学生名单失败!",response.data.errorCode);
        });
      }
    };

    $scope.deleteFile = function () {
    };

    $scope.confirm = function () {
      $scope.closeThisDialog($scope.fileInfo);
    };
  }
]);
