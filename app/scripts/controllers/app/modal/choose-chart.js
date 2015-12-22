'use strict';

app.controller('ChooseChartModalCtrl', function($scope, type, material, expId, table) {
    $scope.data = {};
    table[type].forEach(function(data){
      if (data['material']==material) {
        $scope.data = data['P-deltaL'];
      }
    });

});
