angular.module('nevermore')
  .directive('conflist', function () {
    return {
      templateUrl: 'tpl/app/blocks/nm-configure-list.html',
      restrict: 'EA',
      scope:{
        left:'=',
        right:'='
      },
      replace: true,
      link:function(scope, element, attrs) {
        scope.ltitle = attrs.ltitle;
        scope.rtitle = attrs.rtitle;
      },
      controller: function ($scope) {

        var left_selected;

        var right_selected;

        $scope.leftMove = function(){
          if (right_selected) {
            var index = null;
            for (var i = 0; i < $scope.right.length; i++) {
              if($scope.right[i].id == right_selected.id){
                index = i;
              }
            }
            $scope.right.splice(index,1);
            $scope.left.push(right_selected);
            left_selected = right_selected;
            right_selected = null;
          }
        }

        $scope.rightMove = function(){
          if (left_selected) {
            var index = null;
            for (var i = 0; i < $scope.left.length; i++) {
              if($scope.left[i].id == left_selected.id){
                index = i;
              }
            }
            $scope.left.splice(index,1);
            $scope.right.push(left_selected);
            right_selected = left_selected;
            left_selected = null;
          }
        }

        $scope.leftTreeSelect = function(branch){
          left_selected = branch;
        }

        $scope.rightTreeSelect = function(branch){
          right_selected = branch;
        }
      }
    };
  });
