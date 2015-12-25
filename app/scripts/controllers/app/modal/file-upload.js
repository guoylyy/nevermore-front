'use strict';

app.controller('FileUploadCtrl', ['$scope', 'Upload', 'ResTool', 'ToasterTool', 'AlertTool', 'AttachRes', 'AttachService',
  function ($scope, Upload, ResTool, ToasterTool, AlertTool, AttachRes, AttachService) {
    var URLS = [
      'http://up.qiniu.com',
      'http://up-z0.qiniu.com',
      'http://upload.qiniu.com'
    ];

    $scope.type = $scope.ngDialogData.type;

    $scope.tmpData = {
      attachTagList: [],
      attachTag: null
    };

    if($scope.type == 'CUSTOMER') {
      $scope.tmpData.attachTagList = AttachService.customerAttachTagEnum;
      $scope.metaData = {
        type: 'CUSTOMER_ATTACH'
      };
    }else if($scope.type == 'PAWN') {
      $scope.tmpData.attachTagList = AttachService.pawnAttachTagEnum;
      $scope.metaData = {
        type: 'LOANPAWN_ATTACH'
      };
    }else if($scope.type == 'LOAN'){
      $scope.tmpData.attachTagList = AttachService.loanAttachTagEnum;
      $scope.metaData = {
        type: 'LOANPAWN_ATTACH'
      };
    }
    $scope.tmpData.attachTag = $scope.tmpData.attachTagList[0];

    $scope.$watch('file', function () {
      $scope.uploadFile($scope.file);
    });

    $scope.uploadFile = function (file) {
      if(file) {
        $scope.metaData.tag = $scope.tmpData.attachTag.value;

        ResTool.httpPostWithToken(AttachRes.attach, null, {
          name: file.name,
          attachType: $scope.ngDialogData.attachType || 'SECRET',
          metaData: $scope.metaData
        }, null)
          .then(function (data) {
            if(data.success) {
              var token = data.data.token,
                key = data.data.key;

              file.upload = Upload.upload({
                url: URLS[Math.floor(Math.random() * URLS.length)],
                data: {
                  token: token,
                  key: key,
                  file: file
                }
              });

              file.upload.then(function (response) {
                $scope.fileInfo = response.data.data;
                $scope.fileInfo.type = $scope.tmpData.attachTag.value;
              }, function () {
                delete $scope.file;
                ToasterTool.error($scope.errorMsg || '上传文件失败');
              });
            } else {
              delete $scope.file;
              ToasterTool.error($scope.errorMsg || '上传文件失败');
            }
          });
      }
    };

    $scope.deleteFile = function () {
      ResTool.httpDeleteWithToken(AttachRes.attach, null, {
        id: $scope.fileInfo.id
      }, null)
        .then(function (data) {
          if(data.success) {
            $scope.file = $scope.fileInfo = null;
          }else{
            ToasterTool.error('删除文件失败');
          }
        });
    };

    $scope.confirm = function () {
      $scope.closeThisDialog($scope.fileInfo);
    };
  }
]);
