'use strict';

app.controller('ChooseChartModalCtrl', function($scope, $localStorage,type, material, expId) {
    $scope.data = {};
    var key = ""+expId;
    var graphic = "5plot";
    $localStorage.report[key][graphic][type].forEach(function(data){
      if (data['material']==material) {
        $scope.data = data['P-deltaL'];
      }
    });

});
