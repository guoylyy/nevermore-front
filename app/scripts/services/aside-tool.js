angular.module('nevermore')
  .service('AsideTool', function () {
    var model = this.model = {
      aside: null
    };

    this.initAside = function (aside) {
      model.aside = aside;
    };
  });
