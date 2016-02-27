;
void

function() {
    angular.module("nevermore")
        .controller("ReservationStudentController", ReservationStudentController);

    ReservationStudentController.$inject = ["$scope", "ReservationFactory", "ngDialog",
        "HttpResponseFactory", "ToasterTool", "generalService", "ErrorHandlerFactory",
        "AlertTool"
    ];

    function ReservationStudentController($scope, ReservationFactory, ngDialog,
        HttpResponseFactory, ToasterTool, generalService, ErrorHandlerFactory,
        AlertTool) {

        var errorHandler = ErrorHandlerFactory.handle;
        var vm = this;

        vm.viewReservation = viewReservation

        $scope.isActive = true;

        $scope.reservationList = [];
        $scope.changeFilter = changeFilter;
        $scope.grapStudentReservatoin = grapStudentReservatoin;
        $scope.cancelStudentReservation = cancelReservation;

        loadReservations();

        function loadReservations(){
          ReservationFactory.studentAllReservation()
            .get().$promise
            .then(function(response){
              if(response.success){
                var data = HttpResponseFactory.getResponseData(response);
                data = filterReservation(data);
                angular.copy(data, $scope.reservationList);
              }else{
                errorHandler(response);
              }
            }).catch(errorHandler);
        }

        function changeFilter(){
          loadReservations();
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

        function cancelReservation(reservation){
          AlertTool.confirm({title:'您确定要取消这个预约?'}).then(function(isConfirm) {
    			  if(isConfirm) {
    					ReservationFactory.studentReservation().
    						delete({reservationId:reservation.id})
    						.$promise
    						.then(function(response){
    							if(response.success){
    								ToasterTool.success('取消预约成功!');
    								loadReservations();
    							}else{
    								ToasterTool.error('错误',response.message);
    							}
    						});
    			    AlertTool.close();
    			  }
    			});
        }

        function grapStudentReservatoin(){
          var dialog = ngDialog.open({
            "template": "tpl/app/student/modal/grap-student-reservation.html",
            "controller": "GrapStudentReservationController",
            "closeByDocument": true,
            "closeByEscape": true,
            "className": "nm-dialog nm-dialog-xl",
            "resolve": {
              resList: function(){
                return ReservationFactory.availableStudentReservation().
                  get().$promise;
              }
            }
          });
          dialog.closePromise.then(function(data) {
            if(data.value === 'success'){
              loadReservations();
            }
          });
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
