'use strict';

angular.module('nevermore')
  .directive('searchactionbar', function () {
    return {
      "templateUrl": 'tpl/app/blocks/search-action-bar.html',
      "restrict": 'EA',
      "transclude": true,
      "scope": {
        "placeholder": "=",
        "initAction": "=",
        "onTransit": "&",
      },
      link: function(scope){
        var ACTIONS_MAP = {
          "listing": 0,
          "searching": 1,
          "searched": 2
        }
        var ACTIONS_LIST = ["listing", "searching", "searched"]

        var nowAction = ACTIONS_LIST.indexOf(scope.initAction) != -1 ?
          scope.initAction : ACTIONS_LIST[0]
        , lastAction = nowAction

        scope.isListing = function(){
          return nowAction === "listing"
        }
        scope.isSearching = function(){
          return nowAction === "searching"
        }
        scope.isSearched = function(){
          return nowAction === "searched"
        }

        scope.listing = function(expectedNowAction){
          var newAction = "listing"
          actionTransitTo(newAction, expectedNowAction)
        }
       scope.searching = function(expectedNowAction){
          var newAction = "searching"
          actionTransitTo(newAction, expectedNowAction)
        }
       scope.searched = function(expectedNowAction){
          var newAction = "searched"
          actionTransitTo(newAction, expectedNowAction)
        }

        function actionTransitTo(newAction, expectedNowAction){
          if(canTransitTo(newAction, expectedNowAction)){
            transit(newAction)
          }
        }

        function canTransitTo(newAction, expectedNowAction){
          if(!!expectedNowAction && expectedNowAction !== nowAction){
            return false
          }
          return true
        }

        function transit(newAction){
          lastAction = nowAction
          nowAction = newAction
          typeof scope.onTransit === "function" && scope.onTransit({
            "lastAction": lastAction,
            "nowAction": nowAction,
            "searchWord": scope.searchWord,
          })
        }
      },
    }
  })
