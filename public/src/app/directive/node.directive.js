(function() {
  'use strict';

  angular
    .module('app')
    .directive('node', node);

  //node.$inject = [''];
  function node() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        bindToController: true,
        controller: NodeController,
        controllerAs: 'vm',
        link: link,
        restrict: 'E',
        scope: {
          data: '='
        },
        templateUrl: 'app/directive/node.html'
    };
    return directive;
    
    function link(scope, element, attrs) {
    }
  }
  /* @ngInject */
  function NodeController () {
    
  }
})();