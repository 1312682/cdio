(function() {
'use strict';

  angular
    .module('app.program')
    .controller('ProgramController', ProgramController);

  ProgramController.$inject = ['Program', '$uibModal'];
  function ProgramController(Program, $uibModal) {
    var vm = this;
    vm.programs = [];
    vm.courses = {};
    vm.selectedProgram = null;
    vm.AddProgram = addProgram; 
    vm.SelectProgram = selectProgram;

    activate();

    ////////////////

    function activate() { 
      Program
        .GetAllProgram()
        .then(function(programs) {
          vm.programs = programs
        })
        .catch(function(err) {
          console.log(err);
        });

      vm.courses = {
        title: 'root',
        children: [
          {
            title: 'A',
            children: [
              {
                title: 'C',
                children: [
                  {
                    title: 'E'
                  },
                  {
                    title: 'F'
                  }
                ]
              },
              {
                title: 'D'
              }
            ]
          },
          {
            title: 'B'
          }
        ]
      }
    }

    function addProgram() {
      $uibModal.open({
        controller: 'AddProgramController',
        controllerAs: 'vm',
        templateUrl: 'app/program/addProgram.html',
        size: 'md'
      })
      .result.then(function (program) {
        vm.programs.push(program);
      })
    }

    function selectProgram(program) {
      vm.selectedProgram = program;
    }
  }
})();