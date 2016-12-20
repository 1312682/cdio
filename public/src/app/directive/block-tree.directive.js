(function () {
  'use strict';

  angular
    .module('app')
    .directive('blockTree', blockTree);

  blockTree.inject = [''];
  function blockTree() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      templateUrl: 'app/directive/block-tree.html',
      controller: BlockTreeController,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        programId: '=',
        data: '=',
        tagFilter: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
  /* @ngInject */
  function BlockTreeController() {
    console.log(this.tagFilter);
  }
})();