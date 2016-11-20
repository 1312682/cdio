(function () {
  'use strict';

  angular
    .module('app.outcome')
    .controller('OutcomeController', OutcomeController);

  OutcomeController.$inject = ['$http'];
  function OutcomeController($http) {
    var vm = this;

    vm.program = "";
    vm.treeOptions = {

    };
    
    activate();

    ////////////////

    function activate() {
      vm.programs = ["Công nghệ thông tin - Hệ Chính qui", "Công nghệ thông tin - Hệ Cao đẳng", "Công nghệ thông tin - Hệ chất lượng cao"];

      vm.listOutcome = [
        {
          title: "Node 1",
          children: [
            {
              title: "Node 1.1",
              children: [
                {
                  title: "Node 1.1.1"
                }
              ]
            },
            {
              title: "Node 1.2"
            }
          ]
        }
      ]
    }
  }
})();