;
void

function() {
    angular.module("nevermore")
        .controller("ReservationController", ReservationController);

    ReservationController.$inject = ["ReservationFactory", "ngDialog",
        "HttpResponseFactory", "ToasterTool", "generalService", "ErrorHandlerFactory"
    ];

    function ReservationController(ReservationFactory, ngDialog,
        HttpResponseFactory, ToasterTool, generalService, ErrorHandlerFactory) {

        var errorHandler = ErrorHandlerFactory.handle;
        var vm = this;

        vm.unexpiredReservationInWeekList = [];
        vm.unexpiredReservationOutWeekList = [];
        vm.expiredReservationInWeekList = [];
        vm.expiredReservationOutWeekList = [];

        vm.unexpiredPaginator = {
            page: 1,
            items: undefined,
            itemsPerPage: generalService.pageSize(),
        };

        vm.expiredPaginator = {
            page: 1,
            items: undefined,
            itemsPerPage: generalService.pageSize(),
        };

        vm.unexpiredPageChanged = unexpiredPageChanged;
        vm.expiredPageChanged = expiredPageChanged;
        vm.cancelReservation = cancelReservation;
        vm.viewReservation = viewReservation;

        getUnexpiredReservationsInWeek();
        getUnexpiredReservationsOutWeek();
        getExpiredReservationsInWeek();
        getExpiredReservationsOutWeek();

        function getUnexpiredReservationsInWeek() {
            ReservationFactory.myReservationsInWeek().get({
                    isExpired: false,
                })
                .$promise
                .then(function(response) {
                    if (HttpResponseFactory.isResponseSuccess(response)) {
                        var data = HttpResponseFactory.getResponseData(response);
                        angular.copy(data, vm.unexpiredReservationInWeekList);
                    } else {
                        errorHandler(response);
                    }
                })
                .catch(errorHandler);
        }

        function getUnexpiredReservationsOutWeek() {
            ReservationFactory.myReservationsOutWeek().get({
                    pageNum: vm.unexpiredPaginator.page,
                    pageSize: vm.unexpiredPaginator.itemsPerPage,
                    isExpired: false,
                })
                .$promise
                .then(function(response) {
                    if (HttpResponseFactory.isResponseSuccess(response)) {
                        var data = HttpResponseFactory.getResponseData(response);
                        angular.copy(data, vm.unexpiredReservationOutWeekList);
                        var paginator = HttpResponseFactory.getResponsePaginator(response);
                        angular.copy(paginator, vm.unexpiredPaginator);
                    } else {
                        errorHandler(response);
                    }
                })
                .catch(errorHandler);
        }

        function getExpiredReservationsInWeek() {
            ReservationFactory.myReservationsInWeek().get({
                    isExpired: true,
                })
                .$promise
                .then(function(response) {
                    if (HttpResponseFactory.isResponseSuccess(response)) {
                        var data = HttpResponseFactory.getResponseData(response);
                        angular.copy(data, vm.expiredReservationInWeekList);
                    } else {
                        errorHandler(response);
                    }
                })
                .catch(errorHandler);
        }

        function getExpiredReservationsOutWeek() {
            ReservationFactory.myReservationsOutWeek().get({
                    pageNum: vm.expiredPaginator.page,
                    pageSize: vm.expiredPaginator.itemsPerPage,
                    isExpired: true,
                })
                .$promise
                .then(function(response) {
                    if (HttpResponseFactory.isResponseSuccess(response)) {
                        var data = HttpResponseFactory.getResponseData(response);
                        angular.copy(data, vm.expiredReservationOutWeekList);
                        var paginator = HttpResponseFactory.getResponsePaginator(response);
                        angular.copy(paginator, vm.expiredPaginator);
                    } else {
                        errorHandler(response);
                    }
                })
                .catch(errorHandler);
        }

        function cancelReservation(reservationID) {
            ReservationFactory.reservation().delete({
                    id: reservationID,
                })
                .$promise
                .then(function(response) {
                    if (HttpResponseFactory.isResponseSuccess(response)) {
                        ToasterTool.success("取消预约成功");
                        getUnexpiredReservationsInWeek();
                        getUnexpiredReservationsOutWeek();
                    } else {
                        errorHandler(response);
                    }
                })
                .catch(errorHandler);
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

        function unexpiredPageChanged() {
            getUnexpiredReservationOutWeek();
        }

        function expiredPageChanged() {
            getExpiredReservationsOutWeek();
        }
    }

}();