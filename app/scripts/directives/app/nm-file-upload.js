/**
 * 上传文件命令
 *
 * 使用说明:
 * <button nm-file-upload attach-type="SECRET" meta-data="metaData" error-msg="上传附件失败" upload-promise="promise">上传按钮<button>
 * <a nm-file-upload attach-type="PUBLIC" meta-data="metaData" error-msg="上传头像失败" upload-promise="promise">上传连接<a>
 *
 * attach-type: SECRET | PUBLIC
 * meta-data: null | {
 *    type: 'ACCOUNT_ICON' | 'CUSTOMER_ICON' | 'CUSTOMER_ATTACH' | 'LOANPAWN_ATTACH'
 * }
 *
 * 在controller中:
 * $scope.$watch('promise', function(value) {
 *    if(value) {
 *        value.then(function(response) {
 *          //成功回调
 *        }, function(response) {
 *          //失败回调
 *        }, function(event) {
 *          //过程回调
 *        });
 *    }
 * });
 *
 */

angular.module('nevermore')
  .directive('nmFileUpload', ['$compile', 'ResTool', 'ToasterTool', 'Upload', function ($compile, ResTool,  ToasterTool, Upload) {
    var URLS = [
      'http://up.qiniu.com',
      'http://up-z0.qiniu.com',
      'http://upload.qiniu.com'
      /*'http://up-z1.qiniu.com',*/
      /*'http://upload-z1.qiniu.com'*/
    ];

    return {
      restrict: 'A',
      scope: {
        attachType: '@?',
        errorMsg: '@?',
        metaData: '=?',
        uploadPromise: '=?'
      },
      link: function (scope, elem) {
        scope.attachType = scope.attachType || 'PUBLIC';
        scope.metaData = scope.metaData || null;

        var link = $compile('<button class="upload-file-btn" ngf-select="uploadFiles($files)" ngf-max-size="4MB" style="display:none;"></button>'),
          node = link(scope);

        elem.append(node);

        elem.on('click', function () {
          elem.find('.upload-file-btn').click();
        });

        scope.uploadFiles = function ($files) {
          if($files && $files.length > 0) {
            var file = $files[0];
            // ResTool.httpPostWithToken(AttachRes.attach, null, {
            //   name: file.name,
            //   attachType: scope.attachType,
            //   metaData: scope.metaData
            // }, null)
            //   .then(function (data) {
            //     if(data.success) {
            //       var token = data.data.token,
            //         key = data.data.key;
            //
            //       scope.uploadPromise = file.upload = Upload.upload({
            //         url: URLS[Math.floor(Math.random() * URLS.length)],
            //         data: {
            //           token: token,
            //           key: key,
            //           file: file
            //         }
            //       });
            //
            //       file.upload.error = function () {
            //         ToasterTool.error(scope.errorMsg || '上传文件失败');
            //       };
            //     } else {
            //       ToasterTool.error(scope.errorMsg || '上传文件失败');
            //     }
            //   });
          }
        };
      }
    }
  }]);
