;
void

function() {
    angular.module("nevermore")
        .controller("ReservationLabTaskController", ReservationLabTaskController);

    ReservationLabTaskController.$inject = ["$scope", "ReservationFactory", "ngDialog",
        "HttpResponseFactory", "ToasterTool", "generalService", "ErrorHandlerFactory"
    ];

    function ReservationLabTaskController($scope, ReservationFactory, ngDialog,
        HttpResponseFactory, ToasterTool, generalService, ErrorHandlerFactory) {

        var errorHandler = ErrorHandlerFactory.handle;
        var vm = this;

        vm.viewReservation = viewReservation

        $scope.isActive = true;

        $scope.reservationList = [];
        $scope.changeFilter = changeFilter;

        loadReservation();

        function loadReservation(){
          ReservationFactory.labTeacherTasks()
            .get()
            .$promise
            .then(function(response){
              if (HttpResponseFactory.isResponseSuccess(response)) {
                  var data = HttpResponseFactory.getResponseData(response);
                  data = filterReservation(data);
                  angular.copy(data, $scope.reservationList);
              } else {
                  errorHandler(response);
              }
            })
            .catch(errorHandler);
        }

        function changeFilter(){
          loadReservation();
        }        

        function filterReservation(list){
          if(!$scope.isActive){
            return list;
          }else{
            var rcList = [];
            angular.forEach(list, function(data){
              if(!data.isExpired){
                rcList.push(data);
              }
            });
            return rcList;
          }
        }

        function viewReservation(reservation) {
            var dialog = ngDialog.open({
                "template": "tpl/app/admin/modal/view-experiment-appointment.html",
                "controller": "ViewReservationController",
                "closeByDocument": true,
                "closeByEscape": true,
                "className": "nm-dialog nm-dialog-md",
                "resolve": {
                    data: function() {
                        return ReservationFactory.reservation().get({
                            id: reservation.id
                        }).$promise;
                    }
                },
            });
        }
    }
}();
