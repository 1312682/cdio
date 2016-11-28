(function() {
'use strict';

  angular
    .module('app')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$rootScope', '$state'];
  function SidebarController($rootScope, $state) {
    var vm = this;
    vm.selectedItem = {};

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
      vm.selectedItem = toState.name;
    })

    activate();

    ////////////////

    function activate() { 
      vm.selectedItem = $state.current.name;
    }
  }
})();