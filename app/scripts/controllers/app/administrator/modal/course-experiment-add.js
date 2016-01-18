'use strict';

app.controller('AddExperimentCtrl', ['$scope','CourseManage','ExperimentManage','data', function($scope, CourseManage, ExperimentManage, data) {
  $scope.all_exp = [

  ];
  $scope.select_exp = [];

  $scope.resource = data;

  var courseExps = [];

  function getAllExperiment(){
    return ExperimentManage.all().get();
  }

  function getCourseExperiment(){
    CourseManage.course().get({
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
            $scope.all_exp.push(exp);
          }else {
            $scope.select_exp.push(exp);
          }

        }
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
    CourseManage.course().put({
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
