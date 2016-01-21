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
      link: function(scope, element){
        var inputElement = getInputElement(element)

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

        scope.exitSearch = function(){
          scope.searchWord = ""
          scope.listing()
        }

        scope.search = function(){
          scope.searched()
        }

        inputElement.on("keydown", function(e){
          var ENTER_KEY_CODE = 13
          var keyCode = e.which

          if(keyCode === ENTER_KEY_CODE){
            scope.search()
          }
        })

        scope.enterInput = function(){
          scope.searching('listing')
        }

        scope.leaveInput = function(){
          scope.listing('searching')
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

        function getInputElement(rootElement){
          var formElement = angular.element(angular.element(rootElement).children()[0])
          var inputElement = angular.element(formElement.children()[0])

          return inputElement
        }
      },
    }
  })
