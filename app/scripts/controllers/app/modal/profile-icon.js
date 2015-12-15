'use strict';

app.controller('ProfileIconCtrl', ['$scope', 'Upload', 'ResTool', 'ToasterTool',
function ($scope, Upload, ResTool, ToasterTool) {
  $scope.upload = function (dataUrl) {
    $scope.closeThisDialog(dataUrl);
  }
}
]);
