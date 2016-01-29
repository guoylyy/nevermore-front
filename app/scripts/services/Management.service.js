angular.module('nevermore')
  .service('ManagementService', ["ToasterTool", "ngDialog", "sessionService",
    function ( ToasterTool, ngDialog, sessionService) {
      this.DEFAULT_RESOURCE_TEMPLATE = {
    		"data": [],
        "paginator": {
          "page": 1,
          "items": 0,
          "itemsPerPage": 10,
          "pages": 0
        }
    	};

      this.loadResources = loadResources;

      function loadResources(resourceFactory, pageInfo){
        return resourceFactory.page().get(pageInfo).$promise
      }

      this.ModifyDialog = ModifyDialog;
      this.RichModifyDialog = RichModifyDialog;
      this.AddDialog = AddDialog;
      this.errorHandler = errorHandler;

      function ModifyDialog(){
        var dialog = undefined
        var onModify = undefined,
          onDelete = undefined
        var self = this

        this.open = function(resource, templateUrl, controller, other){
          dialog = ngDialog.open(getDialogConfig(resource, templateUrl, controller, other))
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

      function RichModifyDialog(){
        var dialog = undefined
        var onModify = undefined
        var dialogConfig = undefined
        var self = this

        this.open = function(resource, templateUrl, controller, other){
          dialogConfig = getDialogConfig(resource, templateUrl, controller, other)
          dialogConfig.className = 'nm-dialog nm-dialog-lg'
          dialogConfig.closeByDocument = false
          dialogConfig.closeByEscape = false

          dialog = ngDialog.open(dialogConfig)
          dialog.closePromise.then(processReturnValue)
          return self
        }

        function processReturnValue(data){
          var MODIFY_ACTION = "modify"
          if(data.value === MODIFY_ACTION){
            typeof onModify === "function" && onModify()
          }
        }

        this.setCloseListener = function(modify){
          onModify = typeof modify === "function" ? modify : undefined
          return self
        }
      }

      function AddDialog(){
        var dialog = undefined
        var onAdd = undefined
        var self = this

        this.open = function(templateUrl, controller, other){
          dialog = ngDialog.open(getDialogConfig(templateUrl, controller, other))
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

      function getDialogConfig(resource, templateUrl, controller, other){
        var isModifyDialogConfig = false
        if(other === undefined){
          isModifyDialogConfig = false
          other = controller
          controller = templateUrl
          templateUrl = resource
        }else{
          isModifyDialogConfig = true
        }

        if(isModifyDialogConfig){
          return getModifyDialogConfig(resource, templateUrl, controller, other)
        }else{
          return getAddDialogConfig(templateUrl, controller, other)
        }
      }

      function getModifyDialogConfig(resource, templateUrl, controller, other){
        var config = {
          "template": templateUrl,
          "controller": controller,
          "closeByDocument": true,
          "closeByEscape": true,
          "className": 'nm-dialog',
          "resolve": {
            "data": function(){
              return resource
            },
          },
        }
        angular.extend(config.resolve, other)
        return config
      }

      function getAddDialogConfig(templateUrl, controller, other){
        var config = {
          "template": templateUrl,
          "controller": controller,
          "closeByDocument": true,
          "closeByEscape": true,
          "className": 'nm-dialog',
          "resolve": {},
        }
        angular.extend(config.resolve, other)
        return config
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


  }]);
