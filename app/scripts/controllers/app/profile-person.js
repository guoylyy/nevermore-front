'use strict';

app.controller('ProfilePersonCtrl', ['$scope', '$rootScope','Account', 'sessionService', 'ResTool', function($scope, $rootScope, Account, sessionService, ResTool) {
  $scope.personData = {
    currentUser: null,
    editUser: null,
  };

  var currentUser = sessionService.getCurrUser();

  Account.account().get({'id': currentUser.id},
    function success(data) {
      $scope.personData.currentUser = data.data;
      $scope.personData.editUser = angular.copy(data.data);
    },
    function error(data) {
      var error = data.data;
    }
  );


}]);
