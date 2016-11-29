(function() {
'use strict';

  angular
    .module('app.program')
    .controller('AddProgramController', AddProgramController);

  AddProgramController.$inject = ['$uibModalInstance', 'Program'];
  function AddProgramController($uibModalInstance, Program) {
    var vm = this;
    vm.program = {};
    vm.Cancel = cancel;
    vm.Ok = ok;
    vm.GetAllFaculty = getAllFaculty;
    vm.GetAllType = getAllType;

    activate();

    ////////////////

    function activate() {
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      var result = {};

      Program
        .CreateProgram(vm.program)
        .then(function(program) {
          result = program;
          $uibModalInstance.close(result);
        })
        .catch(function(err) {
          result = err;
          $uibModalInstance.dismiss(result);
        });
    }

    function getAllFaculty(name) {
      return Program.GetAllFaculty(name);
    }

    function getAllType(name) {
      return Program.GetAllType(name);
    }
  }
})();