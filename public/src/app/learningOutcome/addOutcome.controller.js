(function() {
'use strict';

  angular
    .module('app.outcome')
    .controller('AddOutcomeController', AddOutcomeController);

  AddOutcomeController.$inject = ['$uibModalInstance', 'Outcome'];
  function AddOutcomeController($uibModalInstance, Outcome) {
    var vm = this;

    activate();

    ////////////////

    function activate() { }
  }
})();