'use strict';

app.controller('UploadStudentController', ['$scope', 'Upload', 'ResTool', 'ToasterTool', 'AlertTool','sessionService', 'ClazzFactory', 'classId',
  function ($scope, Upload, ResTool, ToasterTool, AlertTool, sessionService, ClazzFactory, classId) {
    var URLS = [
      'http://up.qiniu.com',
      'http://up-z0.qiniu.com',
      'http://upload.qiniu.com'
    ];

    $scope.$watch('file', function () {
      $scope.uploadFile($scope.file);
    });

    $scope.studentList = [];

    $scope.selectedNum = 0;

    $scope.selectAllItems = selectAllItems;

    $scope.addStudentNum = addStudentNum;

    $scope.uploadFile = function (file) {
      if(file) {
        Upload.upload({
            url: base_Url+'/file/upload',
            method: 'POST',
            headers: sessionService.headers(),
            file: file
        }).then (function (response) {
            if (response.data.success){
              var attachId = response.data.data.id;
              ClazzFactory.studentList().get({id: classId, attachId: attachId, operation: "importPreview"})
                .$promise
                .then(function(response){
                  if (response.success) {
                    if (response.data.length == 0) {
                      ToasterTool.error("该文件没检测到任何学生");
                      $scope.file = null;
                    }else {
                      for (var i = 0; i < response.data.length; i++) {
                        var student = {
                          number : response.data[i].account,
                          name : response.data[i].name,
                          gender : response.data[i].gender.code,
                          gender_show : response.data[i].gender.value,
                          selected : false
                        };
                        $scope.studentList.push(student);
                      }
                    }
                  }else {
                    ToasterTool.error(response.message);
                    $scope.file = null;
                  }
                });
            }
        }, function (response) {
          ToasterTool.error(response.message);
          $scope.file = null;
        });
      }
    };

    //选中所有学生按钮点击时间 全选/反选
		function selectAllItems(){
			if($scope.selectAll){
				tagSelectStatus($scope.studentList, true)
        $scope.selectedNum = $scope.studentList.length
			}else{
				//不选中
				tagSelectStatus($scope.studentList, false)
        $scope.selectedNum = 0
			}
		}

    function addStudentNum(status){
      if (status) {
        $scope.selectedNum ++;
      }else {
        $scope.selectedNum --;
      }
    }

		function tagSelectStatus(list, status){
			for(var i=0; i<list.length; i++){
					list[i]['selected'] = status;
			}
		}
		function getSelectedStudentIds(){
			var ids = [];
			for(var i=0; i<$scope.studentList.length; i++){
					if($scope.studentList[i]['selected']){
						ids.push($scope.studentList[i].id);
					}
			}
			return ids;
		}

    $scope.deleteFile = function () {
    };

    $scope.confirm = function () {
      var list = [];
      for (var i = 0; i < $scope.studentList.length; i++) {
        if ($scope.studentList[i].selected) {
          var item = {
            account : $scope.studentList[i].number,
            gender: $scope.studentList[i].gender,
            name : $scope.studentList[i].name
          };
          list.push(item);
        }
      }
      var params = {
        students: list
      };
      ClazzFactory.uploadStudentList().post({id: classId}, params)
        .$promise
        .then(function(response){
          if (response.success) {
            $scope.closeThisDialog('success');
          }
          else {
            ToasterTool.error(response.message);
          }
        });
    };
  }
]);
