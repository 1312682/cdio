(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('BlockTreeModalController', BlockTreeModalController);

  BlockTreeModalController.$inject = ['programId', 'blocks', '$uibModal', '$uibModalInstance'];
  function BlockTreeModalController(programId, blocks, $uibModal, $uibModalInstance) {
    var vm = this;

    vm.majorFilter = '';
    vm.blocks = blocks;
    vm.programId = programId;
    vm.Close = close;
    vm.AddBlock = addBlock;

    activate();

    ////////////////

    function activate() {
    }

    function close() {
      $uibModalInstance.close(vm.root);
    }

    function addBlock() {
      $uibModal
        .open({
          controller: 'BlockModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/blockModal.html',
          size: 'md',
          resolve: {
            block: function() {
              return null;
            },
            programId: function() {
              return programId;
            },
            parentPath: function() {
              return '';
            }
          }
        })
        .result.then(function (block) {
          vm.blocks.push(block);
        });
    }
  }
})();