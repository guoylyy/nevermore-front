'use strict';

app.controller('ChooseChartModalCtrl', function($scope, $localStorage,type, material, expId) {
    $scope.data = {};
    var key = ""+expId;
    $localStorage.report[key]['5plot'][type].forEach(function(data){
      if (data['material']==material) {
        $scope.data = data['P-deltaL'];
      }
    });

});
