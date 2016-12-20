(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('ProgramModalController', ProgramModalController);

  ProgramModalController.$inject = ['program', '$uibModal', '$uibModalInstance', 'Program'];
  function ProgramModalController(program, $uibModal, $uibModalInstance, Program) {
    var isCreateNew = null;
    var vm = this;
    vm.program = null;
    vm.Cancel = cancel;
    vm.Ok = ok;
    vm.GetAllFaculty = getAllFaculty;
    vm.GetAllType = getAllType;

    activate();

    ////////////////

    function activate() {
      if (!program) {
        isCreateNew = true;
        vm.program = {
          faculty: null,
          type: null,
          description: null
        }
      }
      else {
        isCreateNew = false;
        vm.program = program;
      }
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      var result = {};

      if (isCreateNew) {
        Program
          .CreateProgram(vm.program)
          .then(function (program) {
            result = program;
            $uibModalInstance.close(result);
          })
          .catch(function (err) {
            result = err;
            $uibModalInstance.dismiss(result);
          });
      }
      else {
        Program
          .UpdateProgram(vm.program)
          .then(function(res) {
            result = vm.program;
            $uibModalInstance.close(result);
          })
          .catch(function (err) {
            result = err;
            $uibModalInstance.dismiss(result);
          });
      }
    }

    function getAllFaculty(name) {
      return Program.GetAllFaculty(name);
    }

    function getAllType(name) {
      return Program.GetAllType(name);
    }
  }
})();