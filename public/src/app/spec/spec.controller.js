(function() {
'use strict';

  angular
    .module('app.spec')
    .controller('SpecController', ProgramController);

  ProgramController.$inject = ['header'];
  function ProgramController(header) {
    var vm = this;
    vm.data = {};

    activate();

    ////////////////

    function activate() { 
      header.setHeader('Specification');
    }
  }
})();