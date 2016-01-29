'use strict';

app.controller('ViewPictureController', ['$scope', "url",
function ($scope, url ) {
    $scope.url = url;
}
]);
