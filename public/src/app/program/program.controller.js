(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('ProgramController', ProgramController);

  ProgramController.$inject = ['Block', 'Program', '$uibModal'];
  function ProgramController(Block, Program, $uibModal) {
    var vm = this;
    vm.programs = [];
    vm.selectedProgramIndex = null;
    vm.AddProgram = addProgram;
    vm.EditProgram = editProgram;
    vm.DeleteProgram = deleteProgram;
    vm.EditBlock = editBlock;
    vm.SelectProgram = selectProgram;

    activate();

    ////////////////

    function activate() {
      Program
        .GetAllProgram()
        .then(function (programs) {
          vm.programs = programs
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function addProgram() {
      $uibModal
        .open({
          controller: 'ProgramModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/programModal.html',
          size: 'md',
          resolve: {
            program: function () {
              return null;
            }
          }
        })
        .result.then(function (program) {
          vm.programs.push(program);
        });
    }

    function editProgram() {
      $uibModal
        .open({
          controller: 'ProgramModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/programModal.html',
          size: 'md',
          resolve: {
            program: function () {
              return angular.copy(vm.programs[vm.selectedProgramIndex]);
            }
          }
        })
        .result.then(function (program) {
          vm.programs[vm.selectedProgramIndex] = program;
        });
    }

    function deleteProgram() {
      Program
        .DeleteProgram(vm.programs[vm.selectedProgramIndex]._id)
        .then(function (res) {
          vm.programs.splice(vm.selectedProgramIndex, 1);
          vm.selectedProgramIndex = null;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function editBlock() {
      $uibModal
        .open({
          controller: 'BlockTreeModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/blockTreeModal.html',
          size: 'lg',
          resolve: {
            programId: function() {
              return angular.copy(vm.programs[vm.selectedProgramIndex]._id);
            },
            blocks: function() {
              return angular.copy(vm.programs[vm.selectedProgramIndex].blocks);
            }
          }
        });
    }

    function selectProgram(index) {
      vm.selectedProgramIndex = index;
      Block
      .GetAllBlock(vm.programs[vm.selectedProgramIndex]._id)
      .then(function(blocks) {
        vm.programs[vm.selectedProgramIndex].blocks = blocks;
      });
    }
  }
})();