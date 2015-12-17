/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope','$rootScope', 'qService', 'Reservation',
  'Clazz', 'Semester', 'sessionService', 'generalService', 'ngDialog',
  function($scope, $rootScope, qService, Reservation, Clazz, Semester,
    sessionService, generalService, ngDialog) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var semester = sessionService.getCurrSemeter();

    //学生、老师和管理员会load不一样的实验列表
    $scope.loadReservations = function() {
     if($rootScope.currentUser.role == 'STUDENT'){
       var promise = qService.tokenHttpGet(Reservation.studentResByStatusPage, {
         'semester':semester.id,
         'accountId': $rootScope.currentUser.id,
         'pageSize':10000,
         'pageNumber': 1,
         'type': 'clazz'
       });
     }else if($rootScope.currentUser.role.indexOf('TEACHER') > 1){
       var promise = qService.tokenHttpGet(
         Reservation.allTeacherRes, {
         "semesterId": semester.id,
         "teacherId": $rootScope.currentUser.id
       });
     }
     promise.then(function(rc) {
       var list = rc.data;
       var rcList = [];
       for (var i = 0; i < list.length; i++) {
         var res = list[i];
         var type = "";
         if (res.clazz == undefined) {
           type = 'student';
         } else {
           type = 'clazz';
         }
         var map = {
           'id': res.id,
           'title': res.lab.name + '-' + res.experiment.name,
           'start': new Date(res.applyDate + ' ' + res.slot.startTime),
           'end': new Date(res.applyDate + ' ' + res.slot.endTime),
           'color': generalService.getReservationColor(res),
           'status': res.status,
           'type': type,
           'data':res
         };
         rcList.push(map);
       };
       $scope.eventSources.splice(0, $scope.eventSources.length);
       $scope.addRemoveEventSource($scope.eventSources, rcList);
     });
   };
   /* add and removes an event source of choice */
   $scope.addRemoveEventSource = function(sources, source) {
     var canAdd = 0;
     angular.forEach(sources, function(value, key) {
       if (sources[key] === source) {
         sources.splice(key, 1);
         canAdd = 1;
       }
     });
     if (canAdd === 0) {
       sources.push(source);
     }
   };
   $scope.loadReservations();


    /* event source that pulls from google.com */
    $scope.eventSource = {

    };
    /* event source that contains custom events on the scope */
    $scope.events = [

    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-info']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      if( right > $scope.overlay.width() ) {
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 550,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        minTime: "08:00:00",
        maxTime: "23:00:00",
        allDaySlot: false,
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver,
        viewRender: function(view, element) {
          //获取当前日历的日期，刷新出对应的预约
          $scope.loadReservations();
        }
      }
    };

    /* add custom event*/
    $scope.addEvent = function() {
      var dialog = ngDialog.open({
        template: 'tpl/app/modal/reservation-edit.html',
        controller:'TeacherReservationModalCtrl',
        className: 'nm-dialog nm-dialog-sm',
        closeByDocument: true,
        closeByEscape: true,
        resolve: {
            data: function() {
              return {};
            },
            clazzs: function(qService, Clazz) {
              return qService.tokenHttpGet(Clazz.teacherClazzs, {
                'teacherId':$rootScope.currentUser.id,
                'semesterId':sessionService.getCurrSemeter().id
              }); //获取教师本人的clazz
            },
            semester: function(sessionService) {
              return sessionService.getCurrSemeter();
            },
            slots: function(qService, Semester) {
              return qService.tokenHttpGet(Semester.slots, {});
            }
          }
      });
      dialog.closePromise.then(function(data) {
        if (data.value!=null
            &&data.value!='$escape'
            &&data.value!='$closeButton'
            &&data.value!='$document') {
            $scope.loadReservations();
        }
      });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */
