'use strict';

app.controller('TeacherReservationModalController', function($scope, data, clazzs,
 semester, slots, qService, ToasterTool, Course, Exp, Reservation,
  StateChainFactory, InputValidatorFactory) {
    var stateChain = StateChainFactory.getStateChain()
    initStateChain()

    function initStateChain(){ 
      stateChain.pushState("initState")
      .pushState("clazz", function(){
        $scope.data.clazz = null
      }).pushState("exp", function(){
        $scope.data.exp = null
      }).pushState("lab", function(){
        $scope.data.lab = null
      })
    }

    $scope.slots = slots.data,
    $scope.clazzs = clazzs.data;
    $scope.data = data;
    $scope.data['semester'] = semester;
    $scope.data['slot'] = slots.data[0];
    $scope.data['applyDate'] = new Date();
    $scope.data["clazz"] = null
    $scope.data["exp"] = null
    $scope.data["lab"] = null
    $scope.exps = [];
    $scope.labs = [];
    $scope.currentDate = new Date()

    InputValidatorFactory.injectToScope($scope)


    $scope.clazzChanged = function() {
      if($scope.data.clazz === null){
        stateChain.resetChain("initState")
        return
      }
      stateChain.resetChain("clazz")
      
      qService.tokenHttpGet(Course.courseExps, {
        id: $scope.data.clazz.course.id
      }).then(function(rc) {
        $scope.exps = rc.data;
      });
    };

    $scope.expChanged = function() {
      if($scope.data.exp === null){
        stateChain.resetChain("clazz")
        return
      }
      stateChain.resetChain("exp")

      qService.tokenHttpGet(Exp.labs, {
        id: $scope.data.exp.id
      }).then(function(rc) {
        $scope.labs = rc.data;
      });
    };

    $scope.save = function() {
      var currentDate = new Date();
      if (!$scope.data.clazz) {
        ToasterTool.warning('请选择班级!','');
      } else if (!$scope.data.exp) {
        ToasterTool.warning('请选择实验!','');
      } else if (!$scope.data.lab) {
        ToasterTool.warning('请选择实验室!','');
      } else if($scope.data.applyDate < currentDate){
        ToasterTool.warning('预约日期不能是今天之前的日期!','');
      }else {
        $scope.data.applyDate = moment($scope.data.applyDate).format('YYYY-MM-DD');
        var rc = $scope.data;
        var map = {
          "clazz": rc.clazz.id,
          "semester": rc.semester.id,
          "experiment": rc.exp.id,
          "lab": rc.lab.id,
          "slot": rc.slot.id
        };
        var data = {
          "number": "10001",
          "remark": rc.remark,
          "count": rc.count,
          "applyDate": rc.applyDate
        };
        qService.tokenHttpPost(Reservation.clazzReservation, map, data).then(function(rdata) {
          if(rdata.errorCode == "DUPLICATION"){
            ToasterTool.warning('该实验室在您选择的时间段已有预约!','');
          }else{
            ToasterTool.success("预约成功！", "")
            $scope.closeThisDialog('refresh');
          }
        });

      }
    }

  });
