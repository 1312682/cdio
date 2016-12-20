(function () {
  'use strict';

  angular
    .module('app')
    .directive('blockNodes', blockNodes);

  blockNodes.inject = [''];
  function blockNodes() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      templateUrl: 'app/directive/block-nodes.html',
      controller: BlockNodesController,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        programId: '=',
        data: '=',
        tagFilter: '='
      },
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
  /* @ngInject */
  function BlockNodesController() {
    var vm = this;

    vm.DeleteBlock = deleteBlock;

    ////////////////

    function deleteBlock(node) {
      var index = vm.data.indexOf(node);
      vm.data.splice(index, 1);
    }
  }
})();