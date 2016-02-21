'use strict';

app.controller('ConfigExperimentLabController', ['$scope','LabManageFactory','ExperimentManageFactory','data',
function($scope, LabManageFactory, ExperimentManageFactory, data) {
  $scope.all_exp = [

  ];
  $scope.select_exp = [];

  $scope.resource = data;

  var expLabs = [];

  function getAllLab(){
    return LabManageFactory.all().get();
  }

  function getExperimentLab(){
    ExperimentManageFactory.experiment().get({
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
    var all_exp = [];
    var select_exp = [];
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
            all_exp.push(lab);
          }else {
            select_exp.push(lab);
          }
        }
        angular.copy(all_exp, $scope.all_exp);
        angular.copy(select_exp, $scope.select_exp);
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
    ExperimentManageFactory.labs().put({
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
