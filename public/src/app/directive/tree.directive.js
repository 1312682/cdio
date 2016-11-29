(function() {
  'use strict';

  angular
    .module('app')
    .directive('tree', tree);

  //tree.$inject = [''];
  function tree() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        bindToController: true,
        controller: TreeController,
        controllerAs: 'vm',
        link: link,
        restrict: 'E',
        scope: {
          data: '='
        },
        templateUrl: 'app/directive/tree.html'
    };
    return directive;
    
    function link(scope, element, attrs) {
    }
  }
  /* @ngInject */
  function TreeController () {
    var vm = this;

    console.log(vm)
  }
})();