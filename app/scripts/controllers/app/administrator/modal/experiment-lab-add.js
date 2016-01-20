'use strict';

app.controller('AddLabCtrl', ['$scope','LabManage','ExperimentManage','data', function($scope, LabManage, ExperimentManage, data) {
  $scope.all_exp = [

  ];
  $scope.select_exp = [];

  $scope.resource = data;

  var expLabs = [];

  function getAllLab(){
    return LabManage.all().get();
  }

  function getExperimentLab(){
    ExperimentManage.experiment().get({
      "id": data.id
    }).$promise.then(function(data){
      if (data.code == "200") {
        expLabs =  data.data.labs?data.data.labs:[];
      }
      else {
        expLabs = [];
      }
      loadResource();
    });
  }

  function loadResource(){
    getAllLab().$promise
      .then(function(data){
        for (var i = 0; i < data.data.length; i++) {
          var isExist = false;
          for (var j = 0; j < expLabs.length; j++) {
            if (expLabs[j].id == data.data[i].id) {
              isExist = true;
            }
          }
          var lab = {
            label: data.data[i].name,
            id: data.data[i].id
          }
          if (!isExist) {
            $scope.all_exp.push(lab);
          }else {
            $scope.select_exp.push(lab);
          }

        }
      });
  }

  getExperimentLab();

  $scope.save = function(){
    var labList = [];
    for (var i = 0; i < $scope.select_exp.length; i++) {
      var lab = {
        "id": $scope.select_exp[i].id
      }
      labList.push(lab);
    };
    var params = {
      "labs":labList
    };
    ExperimentManage.labs().put({
      "id":data.id
    }, params).$promise.then(function(data){
      if (data.code == "200") {
        $scope.closeThisDialog("modify");
      }
    });
  }

  $scope.cancel = function(){
    $scope.closeThisDialog("cancel");
  }
}]);
