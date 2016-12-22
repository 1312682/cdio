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
    vm.programs = [];
    vm.programIndex = [];

    vm.newNode = "";
    vm.nodes = [];
    vm.tree = [];
    vm.dragEnabled = false;

    // Methods
    vm.Toggle = toggle;
    vm.Remove = remove;
    vm.AddNode = addNode;
    vm.AddSubNode = addSubNode;
    vm.ChooseFile = chooseFile;
    vm.Save = save;

    activate();

    ////////////////

    function activate() {
      Outcome.GetAllPrograms()
        .then(function (programs) {
          for (var i = 0; i < programs.length; i++) {
            vm.programs.push(programs[i]);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    // Tree events
    function toggle(node) {
      node.toggle();
    }

    function remove(node) {
      console.log(node);
      var outcome = node.$nodeScope.$modelValue;
      Outcome
        .DeleteNode(outcome.id)
        .then(function (res) {
          if (res) {
            node.remove();
            toaster.pop('success', "Success", "Remove outcome successfully!!!");
          }
          else {
            toaster.pop('error', 'Failed', "Can't remove node. Please try again!!!");
          }
        });
    }

    function addNode() {
      $uibModal.open({
        controller: 'AddOutcomeController',
        controllerAs: 'vm',
        templateUrl: 'app/learningOutcome/addOutcome.html',
        size: 'lg'
      }).result.then(function (outcome) {
        vm.tree.push({
          id: outcome._id,
          title: outcome.title,
          majors: outcome.majors,
          path: outcome.path,
          nodes: []
        });
        toaster.pop('success', "Success", "Add new learning outcome!!!");
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
          path: outcome.path,
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

    function save() {
      vm.nodes = Outcome.ToMaterializePath(vm.tree, vm.nodes, "", vm.program._id);
    }
  }
})();