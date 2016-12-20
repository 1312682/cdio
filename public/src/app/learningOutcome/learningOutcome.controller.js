(function () {
  'use strict';

  angular
    .module('app.outcome')
    .controller('OutcomeController', OutcomeController);

  OutcomeController.$inject = ['$http', '$scope', 'toaster', '$uibModal', 'Outcome'];

  function OutcomeController($http, $scope, toaster, $uibModal, Outcome) {
    var vm = this;
    window.sc = vm;

    // Variables
    vm.program = "";
    vm.newNode = "";
    vm.currentNode = "";
    vm.nodes = [];
    vm.tree = [];
    vm.dragEnabled = false;

    // Methods
    vm.Toggle = toggle;
    vm.Remove = remove;
    vm.AddSubNode = addSubNode;
    vm.ChooseFile = chooseFile;

    activate();

    ////////////////

    function activate() {
      vm.programs = ["CNTT - Chính Quy", "CNTT - Cao Đẳng", "CNTT - Hoàn Chỉnh"];

      //vm.nodes = Outcome.toMaterializePath(vm.tree, vm.nodes, "");
    }

    // Tree events
    function toggle(node) {
      node.toggle();
    }

    function remove(node) {
      console.log(node);
      var outcome = node.$nodeScope.$modelValue;
      var promise = Outcome.RemoveOutcome(outcome);

      promise.then(function (res) {
        if (res) {
          node.remove();
          toaster.pop('success', "Success", "Remove outcome successfully!!!");
        }
        else {
          toaster.pop('error', 'Failed', "Can't remove node. Please try again!!!");
        }
      });
    }

    function addSubNode(tree) {
      $uibModal.open({
        controller: 'AddOutcomeController',
        controllerAs: 'vm',
        templateUrl: 'app/learningOutcome/addOutcome.html',
        size: 'lg'
      }).result.then(function (outcome) {
        var node = tree.$nodeScope.$modelValue;
        node.nodes.push({
          id: outcome._id,
          title: outcome.title,
          majors: outcome.majors,
          nodes: []
        });
        toaster.pop('success', "Success", "Add new learning outcome!!!");
      });
    }
    // End tree events

    // Read excel file
    function chooseFile() {
      $('#jsExcelFile').click();
    }

    $scope.read = function read(workbook) {
      vm.tree = Outcome.ReadExcelFile(workbook);
      $scope.$evalAsync();
    };

    $scope.error = function error(e) {
      console.log(e);
    };
    // End read excel file
  }
})();