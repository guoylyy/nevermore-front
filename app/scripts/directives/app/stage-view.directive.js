/*
	1. 拿一共有几个stage
	2. 读transclude中的数据，只读第一层，读其中的attr：nmStage，决定是第几步
		2.1 如果数字超过了总stage，忽视。
		2.2 如果数字重复出现，覆盖之前的stage。
		2.3 如果数字小于等于0，忽视。
		2.4 如果不是数字，忽视。
		2.5 如果没有nmStage，使用其在children中的index作为nmStage。
	3. 总stage如果为5，表示状态有1，2，3，4，5。
		3.1 如果不是数字，或者小于等于0，怎么办？
	4. 还接受一个初始状态
		4.1 如果初始状态值大于总stage，使用默认值1。
		4.2 如果初始状态值小于0，使用默认值1。
		4.3 如果初始状态值不是数字，使用默认值1。
	5. 接受两个事件，next和prev，分别用于驱动目前的状态。
		5.1 如果已经到最后一个状态，接受nmStageNext事件但是不会发生动作。
		5.2 如果已经是第一个状态，接受nmStagePrev事件但是不会发生动作。
*/

;void function(){
	angular.module("nevermore")
			.directive("stageViewDirective", stageViewDirective)

	function stageViewDirective(){
		return {
			templateUrl: "tpl/app/blocks/stage-view.html",
			scope: {},
			transclude: true,
			replace: true,
			restrict: "E",
			link: link,
		}
	}

	var TOTAL_STAGE_ATTR_NAME = "nmTotalStage"
	,	TOTAL_STAGE_TAG_NAME = "nm-total-stage"

	var INIT_STAGE_ATTR_NAME = "nmInitStage"
	,	INIT_STAGE_TAG_NAME = "nm-init-stage"

	var STAGE_ATTR_NAME = "nmStage"
	,	STAGE_TAG_NAME = "nm-stage"

	var NEXT_EVENT_NAME = "nmStageNext"
	,	PREV_EVENT_NAME = "nmStagePrev"

	function link(scope, element, attr){
		var totalStage = getTotalStage(attr)
		var initStage = getInitStage(attr)

		standardInitStage(initStage, totalStage)

		var currentStage = initStage
		var stagePercent = 0

		caculateStagePercent()

		var stageInfo = angular.element(element.children()[0])
		var stageBar = angular.element(element.children()[1])

		var stageElementList = getStageElement()

		updateStage()
		scope.$on(NEXT_EVENT_NAME, next)
		scope.$on(PREV_EVENT_NAME, prev)



		function getTotalStage(attr){
			var totalStage = attr[TOTAL_STAGE_ATTR_NAME]
			totalStage = parseInt(totalStage)

			if(isNaN(totalStage) || totalStage <= 0){
				throw new Error(TOTAL_STAGE_TAG_NAME + " must be positive number")
			}

			return totalStage
		}

		function getInitStage(attr){
			var DEFAULT_INIT_STAGE = 1

			var initStage = attr[INIT_STAGE_ATTR_NAME]
			initStage = parseInt(initStage)

			if(isNaN(initStage) || initStage <= 0){
				return DEFAULT_INIT_STAGE
			}

			return initStage
		}

		function standardInitStage(){
			var DEFAULT_INIT_STAGE = 1

			if(initStage > totalStage){
				initStage = DEFAULT_INIT_STAGE
			}
		}

		function caculateStagePercent(){
			stagePercent = parseInt(currentStage / totalStage * 100)
		}

		function getStageElement(){
			var stageElementList = []

			angular.forEach(stageInfo.children(), function(element, key){
				element = angular.element(element)

				if(useDefaultStageIndex(element)){
					stageElementList[key] = element
				}else{
					var nmStage = element.attr(STAGE_ATTR_NAME)
					nmStage = parseInt(nmStage)
					if(isValidStage(nmStage) === true){
						stageElementList[stageIndexToArrayIndex(nmStage)] = element
					}
				}
			})

			return cleanElementList()


			function useDefaultStageIndex(element){
				if(element.attr(STAGE_ATTR_NAME) === undefined){
					return true
				}else{
					return false
				}
			}

			function isValidStage(nmStage){
				if(isNaN(nmStage) || nmStage <= 0 || nmStage > totalStage){
					return false
				}else{
					return true
				}
			}

			function cleanElementList(){
				return stageElementList.filter(function(element){
					if(element === undefined){
						return false
					}else{
						return true
					}
				})				
			}
		}

		function next(){
			if(currentStage === totalStage){
				return
			}

			currentStage += 1
			caculateStagePercent()
			updateStage()
		}

		function prev(){
			if(currentStage === 1){
				return
			}

			currentStage -= 1
			caculateStagePercent()
			updateStage()
		}

		function updateStage(){
			stageBar.css({
				width: stagePercent + "%",
			})

			angular.forEach(stageElementList, function(element, key){
				if(arrayIndexToStageIndex(key) === currentStage){
					showStageElement(element)
				}else{
					hideStageElement(element)
				}
			})

			function showStageElement(element){
				if(element.hasClass("ng-hide")){
					element.removeClass("ng-hide")
				}
			}

			function hideStageElement(element){
				if(element.hasClass("ng-hide") === false){
					element.addClass("ng-hide")
				}
			}
		}

		function arrayIndexToStageIndex(arrayIndex){
			return arrayIndex + 1
		}

		function stageIndexToArrayIndex(stageIndex){
			return stageIndex - 1
		}
	}
}()