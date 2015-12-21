'use strict';

app.controller('ChooseChartModalCtrl', function($scope, $localStorage,type, material) {
    $scope.data = {};

    $localStorage.report['5plot'][type].forEach(function(data){
      if (data['material']==material) {
        $scope.data = data['P-deltaL'];
      }
    });
    
});
