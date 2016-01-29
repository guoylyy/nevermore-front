'use strict';

app.controller('ConfigCourseExperimentController', ['$scope','CourseManageFactory','ExperimentManageFactory','data', function($scope, CourseManageFactory, ExperimentManageFactory, data) {
  $scope.all_exp = [

  ];
  $scope.select_exp = [];

  $scope.resource = data;

  var courseExps = [];

  function getAllExperiment(){
    return ExperimentManageFactory.all().get();
  }

  function getCourseExperiment(){
    CourseManageFactory.course().get({
      "id": data.id
    }).$promise.then(function(data){
      if (data.code == "200") {
        courseExps =  data.data.experiments?data.data.experiments:[];
      }
      else {
        courseExps = [];
      }
      loadResource();
    });
  }

  function loadResource(){
    var all_exp = [];
    var select_exp = [];
    getAllExperiment().$promise
      .then(function(data){
        for (var i = 0; i < data.data.length; i++) {
          var isExist = false;
          for (var j = 0; j < courseExps.length; j++) {
            if (courseExps[j].id == data.data[i].id) {
              isExist = true;
            }
          }
          var exp = {
            label: data.data[i].name,
            id: data.data[i].id
          }
          if (!isExist) {
            all_exp.push(exp);
          }else {
            select_exp.push(exp);
          }

        }
        angular.copy(all_exp, $scope.all_exp);
        angular.copy(select_exp, $scope.select_exp);
      });
  }

  getCourseExperiment();

  $scope.save = function(){
    var expList = [];
    for (var i = 0; i < $scope.select_exp.length; i++) {
      var exp = {
        "id": $scope.select_exp[i].id
      }
      expList.push(exp);
    };
    var params = {
      "experiments":expList
    };
    CourseManageFactory.experiments().put({
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
