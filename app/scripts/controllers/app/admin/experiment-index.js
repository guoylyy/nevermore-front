app.controller("ExperimentIndexCtrl", ["$scope", "ngDialog", "ToasterTool",  
	function($scope, ngDialog, ToasterTool){
	$scope.DEFAULT_RESOURCE_TEMPLATE = {
		"data": [],
		"totalPageNum": 0,
		"curPageNum": 1,
		"totalItemNum": 0,
	}

	$scope.loadResources = loadResources

	function loadResources(resourceFactory){
		return resourceFactory.all().get().$promise
	}

	$scope.ModifyDialog = ModifyDialog
	$scope.AddDialog = AddDialog

	$scope.errorHandler = errorHandler

	function ModifyDialog(){
		var dialog = undefined
		var onModify = undefined,
			onDelete = undefined
		var self = this

		this.open = function(resource, templateUrl, controller){
			dialog = ngDialog.open(getDialogConfig(resource, templateUrl, controller))
			dialog.closePromise.then(processReturnValue)
			return self
		}

		function processReturnValue(data){
			var DELETE_ACTION = "delete"
			var MODIFY_ACTION = "modify"
			if(data.value === DELETE_ACTION){
				typeof onDelete === "function" && onDelete()
			}else if(data.value === MODIFY_ACTION){
				typeof onModify === "function" && onModify()
			}
		}

		this.setCloseListener = function(modify, del){
			onModify = typeof modify === "function" ? modify : undefined
			onDelete = typeof del === "function" ? del : undefined
			return self
 		}
	}

	function AddDialog(){
		var dialog = undefined
		var onAdd = undefined
		var self = this

		this.open = function(templateUrl, controller){
			dialog = ngDialog.open(getDialogConfig(templateUrl, controller))
			dialog.closePromise.then(processReturnValue)
			return self
		}

		function processReturnValue(data){
			if(!!data.value.resource){
				typeof onAdd === "function" && onAdd()
			}
		}

		this.setCloseListener = function(add){
			onAdd = typeof add === "function" ? add : undefined
			return self
 		}
	}

	function getDialogConfig(resource, templateUrl, controller){
		var isModifyDialogConfig = false
		if(controller === undefined){
			isModifyDialogConfig = false
			controller = templateUrl
			templateUrl = resource
		}else{
			isModifyDialogConfig = true
		}

		if(isModifyDialogConfig){
			return getModifyDialogConfig(resource, templateUrl, controller)
		}else{
			return getAddDialogConfig(templateUrl, controller)
		}
	}

	function getModifyDialogConfig(resource, templateUrl, controller){
		return {
			"template": templateUrl,
			"controller": controller,
			"closeByDocument": true,
			"closeByEscape": true,
			"resolve": {
				"data": function(){
					return resource
				},
			},
		}
	}

	function getAddDialogConfig(templateUrl, controller){
		return {
			"template": templateUrl,
			"controller": controller,
			"closeByDocument": true,
			"closeByEscape": true,
		}
	}

	function errorHandler(error){
		var errorMessage = getErrorMessage(error)
		showErrorTip(errorMessage)
	}

	function getErrorMessage(error){
		if(typeof error === "object"){
			return error.errorCode || error.toString()
		}else{
			return error.toString()
		}
	}

	function showErrorTip(error){
		ToasterTool.error(error)
	}
}])