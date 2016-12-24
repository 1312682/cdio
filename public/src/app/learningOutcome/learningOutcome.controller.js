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
    vm.program = null;
    vm.programs = [];
    vm.programIndex = [];

    vm.newNode = "";
    vm.nodes = [];
    vm.tree = [];
    vm.dragEnabled = false;
    vm.localEdit = true;

    // Methods
    vm.Toggle = toggle;
    vm.Remove = remove;
    vm.AddNode = addNode;
    vm.AddSubNode = addSubNode;
    vm.EditNode = editNode;
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
      var outcome = node.$nodeScope.$modelValue;

      if (vm.localEdit) {
        node.remove();
      }
      else {
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
    }

    function addNode() {
      $uibModal.open({
        controller: 'OutcomeModalController',
        controllerAs: 'vm',
        templateUrl: 'app/learningOutcome/outcomeModal.html',
        size: 'lg',
        resolve: {
          outcome: function () {
            return null;
          }
        }
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
        controller: 'OutcomeModalController',
        controllerAs: 'vm',
        templateUrl: 'app/learningOutcome/outcomeModal.html',
        size: 'lg',
        resolve: {
          outcome: function () {
            return null;
          }
        }
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

    function editNode(node) {
      var item = node.$nodeScope.$modelValue;
      $uibModal.open({
        controller: 'OutcomeModalController',
        controllerAs: 'vm',
        templateUrl: 'app/learningOutcome/outcomeModal.html',
        size: 'lg',
        resolve: {
          outcome: function () {
            return angular.copy(item);
          }
        }
      })
        .result.then(function (outcome) {
          item.title = outcome.title;
          item.majors = outcome.majors;

          $scope.$evalAsync();
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
      if (vm.program !== null && vm.tree.length > 0) {
        vm.nodes = Outcome.ToMaterializePath(vm.tree, "", vm.program._id);
        console.log(vm.nodes);
        toaster.pop('success', "Success", "Update program successfully!!!");
      }
      else {
        toaster.pop('error', "Failed", "Information missed!!!");
      }
    }
  }
})();