;
void
function() {
    "use strict";

    angular.module("nevermore")
        .filter("activeFilter", function() {
            return function(active) {
                if (active) {
                    return "开放";
                } else {
                    return "关闭";
                }
            };
        })
    angular.module("nevermore")
        .filter("nmAppointmentStatus", function() {
            return function(status) {
                if (status.code === "APPLY") {
                    return "已失效";
                } else {
                    return "已完成";
                }
            };
        });
}();