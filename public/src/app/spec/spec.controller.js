(function() {
'use strict';

  angular
    .module('app.spec')
    .controller('SpecController', ProgramController);

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