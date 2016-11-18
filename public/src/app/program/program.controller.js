(function() {
'use strict';

  angular
    .module('app')
    .controller('ProgramController', ProgramController);

  //ProgramController.$inject = [''];
  function ProgramController() {
    var vm = this;
    
    vm.data = {};

    activate();

    ////////////////

    function activate() { 
      vm.data = 'abcdef';
    }
  }
})();