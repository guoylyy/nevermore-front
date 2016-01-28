'use strict';

app.controller('CalendarController', ['$scope', 'ResTool',  'ToasterTool','AlertTool',
  'sessionService', 'generalService', 'reservationFactory', 'uiCalendarConfig', 'DateTool',
  function($scope, ResTool,  ToasterTool, AlertTool, sessionService, generalService,
     reservationFactory, uiCalendarConfig, DateTool) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        /* event source that contains custom events on the scope */
        $scope.events = [
        ];

        $scope.loadReservations = function(start, end){
          ResTool.httpGet(reservationFactory.reservations,{
            'startDate': start,
            'endDate': end
          }, null).then(function(data){
            if(data.success){
              var rList = handleReservations(data.data);
              $scope.eventSources.splice(0, $scope.eventSources.length);
              $scope.addRemoveEventSource($scope.eventSources, rList);
            }else{
              //ToasterTool.error("获取");
            }
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

        $scope.renderCalender = function(calendar) {
          if (uiCalendarConfig.calendars[calendar]) {
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
        };
        function handleReservations(reservations){
          var rcList = [];
          for (var i = 0; i < reservations.length; i++) {
            var res = reservations[i]
            var start = DateTool.format(new Date(res.applyDate)) + ' ' + res.slot.startTime
            var end = DateTool.format(new Date(res.applyDate)) + ' ' + res.slot.endTime
            var map = {
              'id': res.id,
              'title': res.experiment.name,
              'start': start,
              'end': end,
              'color': generalService.getReservationColor(res),
              'status': res.status,
              'data': res,
              'location': res.lab.name,
              'courseName': res.clazz.course.name,
              'slot': res.slot,
              'teacherName': res.clazz.teacher.name
            };
            if(res.status.code === 'APPROVED'){
              rcList.push(map);
            }
          };
          return rcList;
        };

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
            height: 800,
            editable: false,
            defaultView: 'agendaWeek',
            header:{
              left: 'prev',
              center: 'title',
              right: 'next'
            },
            lang: 'zh-cn',
            selectable: true,
            slotDuration: '00:30:00',
            allDaySlot: false,
            minTime: "08:00:00",
            maxTime: "23:00:00",
            dayClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventMouseover: $scope.alertOnMouseOver,
            viewRender: function(view, element) {
              //获取当前日历的日期，刷新出对应的预约
              var start = view.start.toDate();
              var end = view.end.toDate();
              $scope.loadReservations(start, end);
            }
          }
        };
        /* add custom event*/
        $scope.addEvent = function() {

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
