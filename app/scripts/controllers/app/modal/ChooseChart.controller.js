'use strict';

app.controller('ChooseChartModalCtrl', [ '$scope', 'expId', 'data',
  function($scope, expId, data) {
    $scope.data = data;
}]);
